import React from 'react';

const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="bg-base-100 rounded-[3rem] shadow-xl border border-base-200 overflow-hidden animate-pulse">
      <div className="overflow-x-auto">
        <table className="table table-lg w-full">
          <thead>
            <tr className="bg-base-200/50">
              {[...Array(cols)].map((_, i) => (
                <th key={i} className="py-6">
                  <div className="h-4 bg-base-300 rounded w-24 mx-auto"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr key={i} className="border-b border-base-200">
                {[...Array(cols)].map((_, j) => (
                  <td key={j} className="py-8">
                    <div className="flex items-center gap-4">
                      {j === 0 && <div className="w-12 h-12 bg-base-300 rounded-xl"></div>}
                      <div className="h-4 bg-base-300 rounded w-full"></div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
