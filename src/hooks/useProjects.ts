'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      // Anyone can read projects (public)
      const { data, error: err } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;

      setProjects(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}

export async function createProject(
  title: string,
  description: string,
  image_url: string
) {
  const supabase = createClient();

  // Check if user is admin
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    throw new Error('Not authenticated');
  }

  const { data: adminCheck } = await supabase
    .from('admin')
    .select('id')
    .eq('admin_id', user.user.id)
    .single();

  if (!adminCheck) {
    throw new Error('Only admin can create projects');
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([
      {
        title,
        description,
        image_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProject(
  id: string,
  updates: Partial<Omit<Project, 'id' | 'created_at'>>
) {
  const supabase = createClient();

  // Check if user is admin
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    throw new Error('Not authenticated');
  }

  const { data: adminCheck } = await supabase
    .from('admin')
    .select('id')
    .eq('admin_id', user.user.id)
    .single();

  if (!adminCheck) {
    throw new Error('Only admin can update projects');
  }

  const { data, error } = await supabase
    .from('projects')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteProject(id: string) {
  const supabase = createClient();

  // Check if user is admin
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) {
    throw new Error('Not authenticated');
  }

  const { data: adminCheck } = await supabase
    .from('admin')
    .select('id')
    .eq('admin_id', user.user.id)
    .single();

  if (!adminCheck) {
    throw new Error('Only admin can delete projects');
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) throw new Error(error.message);
}
