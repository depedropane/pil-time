'use client';

import { useEffect, useState } from 'react';
import { useProjects, createProject, updateProject, deleteProject } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/Skeleton';
import { Plus, Edit2, Trash2, FileJson } from 'lucide-react';
import { Project } from '@/types';

export default function ProjectsPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const { projects, loading, error, refetch } = useProjects();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [authLoading, isAdmin, router]);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        image_url: editingProject.image_url,
      });
    } else {
      setFormData({ title: '', description: '', image_url: '' });
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title || !formData.description) {
      setFormError('Title and description are required');
      return;
    }

    setSaving(true);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, {
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
        });
      } else {
        await createProject(
          formData.title,
          formData.description,
          formData.image_url
        );
      }

      setIsOpen(false);
      setEditingProject(null);
      setFormData({ title: '', description: '', image_url: '' });
      await refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await refetch();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', image_url: '' });
    setIsOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus size={20} />
          New Project
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={<FileJson size={48} />}
            title="No projects yet"
            description="Create your first project to get started building your portfolio"
            action={
              <Button onClick={openCreateModal} className="flex items-center gap-2">
                <Plus size={20} />
                Create Project
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} hoverable className="overflow-hidden flex flex-col">
              {project.image_url && (
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(project)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        size="md"
      >
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Title"
            placeholder="My Awesome Project"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project..."
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <Input
            label="Image URL (optional)"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={saving} className="flex-1">
              {editingProject ? 'Update' : 'Create'} Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        image_url: editingProject.image_url,
      });
    } else {
      setFormData({ title: '', description: '', image_url: '' });
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title || !formData.description) {
      setFormError('Title and description are required');
      return;
    }

    setSaving(true);

    try {
      if (editingProject) {
        await updateProject(editingProject.id, {
          title: formData.title,
          description: formData.description,
          image_url: formData.image_url,
        });
      } else {
        await createProject(
          formData.title,
          formData.description,
          formData.image_url
        );
      }

      setIsOpen(false);
      setEditingProject(null);
      setFormData({ title: '', description: '', image_url: '' });
      await refetch();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await refetch();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', image_url: '' });
    setIsOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus size={20} />
          New Project
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {projects.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={<FileJson size={48} />}
            title="No projects yet"
            description="Create your first project to get started building your portfolio"
            action={
              <Button onClick={openCreateModal} className="flex items-center gap-2">
                <Plus size={20} />
                Create Project
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} hoverable className="overflow-hidden flex flex-col">
              {project.image_url && (
                <div className="h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEditModal(project)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
        size="md"
      >
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Project Title"
            placeholder="My Awesome Project"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your project..."
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <Input
            label="Image URL (optional)"
            type="url"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={saving} className="flex-1">
              {editingProject ? 'Update' : 'Create'} Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
