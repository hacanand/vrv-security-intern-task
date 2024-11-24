'use client'

import { useState } from 'react'
import UserManagement from './UserManagement'
import RoleManagement from './RoleManagement'
import PermissionManagement from './PermissionManagement'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">RBAC Dashboard</h1>
      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === 'roles' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('roles')}
        >
          Roles
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'permissions' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('permissions')}
        >
          Permissions
        </button>
      </div>
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'roles' && <RoleManagement />}
      {activeTab === 'permissions' && <PermissionManagement />}
    </div>
  )
}

export default Dashboard

