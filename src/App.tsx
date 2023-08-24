import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="flex gap-1 py-3 px-1 md:gap-2 max-w-7xl mx-auto min-h-screen">
      {/* Side Bar (Menu) */}
      <div className="flex-none w-1/5 bg-blue-300 max-h-screen rounded-xl">
        <div className="px-0 py-3 gap-6 mx-1 flex flex-col text-slate-900 md:text-xl sm:p-4 lg:p-8 md:gap-12">
          <h2 className="font-bold text-slate-950 uppercase">Menu</h2>
          <nav className="flex flex-col gap-4 lg:gap-8">
            <NavLink
              to={'/contacts'}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-950 font-bold mr-auto'
                  : 'hover:text-slate-500 mr-auto'
              }
            >
              Contacts
            </NavLink>
            <NavLink
              to={'/charts-maps'}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-950 font-bold mr-auto'
                  : 'hover:text-slate-500 mr-auto'
              }
            >
              Charts and Maps
            </NavLink>
          </nav>
        </div>
      </div>
      {/* Main Content (Contacts and Chart-Map Side) */}
      <div className="flex-initial w-4/5 bg-blue-100 rounded-xl">
        <main className="p-2 mx-2 text-slate-50 md:text-xl md:p-8 md:gap-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
