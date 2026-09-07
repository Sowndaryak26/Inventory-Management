import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

type SearchFilterProps = {
  search: string;
  category: string;
  status: string;

  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  setStatus: (value: string) => void;

  onAdd?: () => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  category,
  status,
  setSearch,
  setCategory,
  setStatus,
}) => {
  return (
    <div className="mb-6 rounded-2xl border border-slate-700/70 bg-[#111a2b] p-4 shadow-xl">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

        {/* Search Box */}
        <div className="relative flex-1">

          <SearchIcon
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
            sx={{
              color: "#7f8ea8",
              fontSize: 21,
            }}
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by item name or code..."
            className="h-12 w-full rounded-xl border border-slate-700 bg-[#18243a] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
          />

        </div>

        {/* Category */}
        <div className="relative min-w-[190px]">

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-[#18243a] px-4 text-sm text-slate-300 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
          >
            <option value="">
              All Categories
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Clothing">
              Clothing
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Accessories">
              Accessories
            </option>

          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            ▼
          </span>

        </div>

        {/* Status */}
        <div className="relative min-w-[180px]">

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-[#18243a] px-4 text-sm text-slate-300 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/10"
          >
            <option value="">
              All Status
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>

          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            ▼
          </span>

        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("");
            setStatus("");
          }}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#1c2a43] px-5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
        >
          <FilterListIcon
            sx={{
              fontSize: 20,
            }}
          />

          Reset
        </button>

      </div>

      {/* Active Filters */}
      {(search || category || status) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-700/60 pt-4">

          <span className="mr-1 text-xs font-medium text-slate-500">
            Active filters:
          </span>

          {search && (
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
              Search: {search}
            </span>
          )}

          {category && (
            <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-300">
              Category: {category}
            </span>
          )}

          {status && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                status === "In Stock"
                  ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : status === "Low Stock"
                  ? "border border-amber-400/30 bg-amber-400/10 text-amber-300"
                  : "border border-rose-400/30 bg-rose-400/10 text-rose-300"
              }`}
            >
              Status: {status}
            </span>
          )}

        </div>
      )}

    </div>
  );
};

export default SearchFilter;