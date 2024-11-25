'use client'

import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react'

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
}

const initialRoles: Role[] = [
  { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['Read', 'Write', 'Delete'] },
  { id: 2, name: 'Editor', description: 'Can edit and publish content', permissions: ['Read', 'Write'] },
  { id: 3, name: 'Viewer', description: 'Can view content only', permissions: ['Read'] },
]

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddRole = (newRole: Omit<Role, 'id'>) => {
    setRoles([...roles, { ...newRole, id: roles.length + 1 }])
    setIsModalOpen(false)
  }

  const handleEditRole = (updatedRole: Role) => {
    setRoles(roles.map(role => (role.id === updatedRole.id ? updatedRole : role)))
    setEditingRole(null)
    setIsModalOpen(false)
  }

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Role Management</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="mr-2" size={16} />
          Add Role
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Permissions</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {roles.map((role) => (
            <tr
              key={role.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {role.name}
              </td>
              <td className="py-3 px-6 text-left">{role.description}</td>
              <td className="py-3 px-6 text-left">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs mr-2"
                  >
                    {permission}
                  </span>
                ))}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    onClick={() => {
                      setEditingRole(role);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <RoleModal
          role={editingRole}
          // @ts-expect-error
          onSave={editingRole ? handleEditRole : handleAddRole}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRole(null);
          }}
        />
      )}
    </div>
  );
}

interface RoleModalProps {
  role: Role | null
  onSave: (role: Role | Omit<Role, 'id'>) => void
  onClose: () => void
}

const RoleModal: React.FC<RoleModalProps> = ({ role, onSave, onClose }) => {
  const [name, setName] = useState(role?.name || '')
  const [description, setDescription] = useState(role?.description || '')
  const [permissions, setPermissions] = useState<string[]>(role?.permissions || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(role ? { ...role, name, description, permissions } : { name, description, permissions })
  }

  const togglePermission = (permission: string) => {
    setPermissions(
      permissions.includes(permission)
        ? permissions.filter(p => p !== permission)
        : [...permissions, permission]
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {role ? 'Edit Role' : 'Add Role'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="mt-2 space-y-2">
              {['Read', 'Write', 'Delete'].map(permission => (
                <label key={permission} className="inline-flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{permission}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RoleManagement

