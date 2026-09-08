import Inventory2Icon from "@mui/icons-material/Inventory2";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Inventory2Icon />
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Inventory Management
            </h1>

            <p className="text-sm text-gray-500">
              Manage your inventory efficiently
            </p>
          </div>
        </div>

        <div className="hidden md:block text-sm text-gray-500">
          Admin Dashboard
        </div>

      </div>
    </header>
  );
}

export default Header;