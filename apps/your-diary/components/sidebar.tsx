import React from 'react';

interface SidebarProps {
  name: string;
}

const Sidebar: React.FC<SidebarProps> = ({ name }) => {
  return (
    <div className="fixed h-screen w-1/4 bg-slate-50">
      <h2 className="text-center my-3">{name}</h2>
    </div>
  );
};

export default Sidebar;
