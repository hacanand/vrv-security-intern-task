"use client";

import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

interface Permission {
  id: number;
  name: string;
  description: string;
  scope: string;
}

const initialPermissions: Permission[] = [
  {
    id: 1,
    name: "Read Users",
    description: "Can view user information",
    scope: "Users",
  },
  {
    id: 2,
    name: "Edit Users",
    description: "Can modify user information",
    scope: "Users",
  },
  {
    id: 3,
    name: "Delete Users",
    description: "Can remove users from the system",
    scope: "Users",
  },
  {
    id: 4,
    name: "Read Posts",
    description: "Can view blog posts",
    scope: "Blog",
  },
  {
    id: 5,
    name: "Edit Posts",
    description: "Can modify blog posts",
    scope: "Blog",
  },
  {
    id: 6,
    name: "Delete Posts",
    description: "Can remove blog posts",
    scope: "Blog",
  },
];

const PermissionManagement = () => {
  const [permissions, setPermissions] =
    useState<Permission[]>(initialPermissions);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPermission = (newPermission: Omit<Permission, "id">) => {
    setPermissions([
      ...permissions,
      { ...newPermission, id: permissions.length + 1 },
    ]);
    setIsModalOpen(false);
  };

  const handleEditPermission = (updatedPermission: Permission) => {
    setPermissions(
      permissions.map((permission) =>
        permission.id === updatedPermission.id ? updatedPermission : permission
      )
    );
    setEditingPermission(null);
    setIsModalOpen(false);
  };

  const handleDeletePermission = (id: number) => {
    setPermissions(permissions.filter((permission) => permission.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Permission Management</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="mr-2" size={16} />
          Add Permission
        </button>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Scope</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {permissions.map((permission) => (
            <tr
              key={permission.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {permission.name}
              </td>
              <td className="py-3 px-6 text-left">{permission.description}</td>
              <td className="py-3 px-6 text-left">
                <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                  {permission.scope}
                </span>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button
                    className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                    onClick={() => {
                      setEditingPermission(permission);
                      setIsModalOpen(true);
                    }}
                  >
                    <PencilIcon size={16} />
                  </button>
                  <button
                    className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
                    onClick={() => handleDeletePermission(permission.id)}
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
        <PermissionModal
          permission={editingPermission}
           
          onSave={(permission) => {
            if (editingPermission) {
              handleEditPermission(permission as Permission);
            } else {
              handleAddPermission(permission as Omit<Permission, "id">);
            }
          }}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPermission(null);
          }}
        />
      )}
    </div>
  );
};

interface PermissionModalProps {
  permission: Permission | null;
  onSave: (permission: Permission | Omit<Permission, "id">) => void;
  onClose: () => void;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  permission,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(permission?.name || "");
  const [description, setDescription] = useState(permission?.description || "");
  const [scope, setScope] = useState(permission?.scope || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(
      permission
        ? { ...permission, name, description, scope }
        : { name, description, scope }
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {permission ? "Edit Permission" : "Add Permission"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="scope"
              className="block text-sm font-medium text-gray-700"
            >
              Scope
            </label>
            <input
              type="text"
              id="scope"
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
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
  );
};

export default PermissionManagement;
