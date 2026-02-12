import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';

const AdminPanel = ({ isOpen, onClose, projects, setProjects, skills, setSkills, tools, setTools }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Senha incorreta!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setEditingItem(null);
  };

  const handleAddProject = () => {
    setEditingItem({ type: 'project', id: null });
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      tech: [],
      category: 'Frontend',
      github: '',
      demo: '',
      features: [],
      updated: new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
    });
  };

  const handleEditProject = (project, index) => {
    setEditingItem({ type: 'project', id: index });
    setFormData(project);
  };

  const handleSaveProject = () => {
    if (!formData.title || !formData.description || !formData.github) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (editingItem.id !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingItem.id] = formData;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, formData]);
    }

    setEditingItem(null);
    setFormData({});
  };

  const handleDeleteProject = (index) => {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              {isAuthenticated ? '🔐 Painel Administrativo' : 'Login Admin'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {!isAuthenticated ? (
              // Login Form
              <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha do Admin
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-400 focus:outline-none"
                      placeholder="Digite a senha"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  Entrar
                </button>
              </form>
            ) : (
              // Admin Panel
              <div className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 border-b border-gray-700">
                  {['projects', 'skills', 'tools'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === tab
                          ? 'text-green-400 border-b-2 border-green-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab === 'projects' ? 'Projetos' : tab === 'skills' ? 'Habilidades' : 'Ferramentas'}
                    </button>
                  ))}
                </div>

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <button
                      onClick={handleAddProject}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Novo Projeto
                    </button>

                    {editingItem?.type === 'project' && (
                      <div className="bg-gray-700 p-4 rounded-lg space-y-3 border border-gray-600">
                        <h3 className="font-semibold text-white">
                          {editingItem.id !== null ? 'Editar Projeto' : 'Novo Projeto'}
                        </h3>
                        <input
                          type="text"
                          placeholder="Título"
                          value={formData.title || ''}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                        />
                        <textarea
                          placeholder="Descrição curta"
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                          rows="2"
                        />
                        <textarea
                          placeholder="Descrição completa (para o modal)"
                          value={formData.fullDescription || ''}
                          onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                          rows="3"
                        />
                        <input
                          type="text"
                          placeholder="URL do GitHub"
                          value={formData.github || ''}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="URL da Demo (opcional)"
                          value={formData.demo || ''}
                          onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                        />
                        <select
                          value={formData.category || 'Frontend'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                        >
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Full-Stack</option>
                          <option>Data</option>
                          <option>Game Development</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Tecnologias (separadas por vírgula)"
                          value={formData.tech?.join(', ') || ''}
                          onChange={(e) => setFormData({ ...formData, tech: e.target.value.split(',').map(t => t.trim()) })}
                          className="w-full px-3 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-green-400 focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveProject}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 rounded transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {projects.map((project, index) => (
                        <div key={index} className="bg-gray-700 p-3 rounded-lg flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white">{project.title}</h4>
                            <p className="text-sm text-gray-400">{project.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProject(project, index)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(index)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div className="text-gray-400">
                    <p>Gerenciamento de habilidades em desenvolvimento...</p>
                  </div>
                )}

                {/* Tools Tab */}
                {activeTab === 'tools' && (
                  <div className="text-gray-400">
                    <p>Gerenciamento de ferramentas em desenvolvimento...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {isAuthenticated && (
            <div className="bg-gray-900 border-t border-gray-700 px-6 py-4 flex justify-end">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
