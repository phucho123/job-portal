import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { companyData } from "../../assets/data";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCompanyList } from "../../store/companySlice";
import { fetchCompanyList } from "../../assets/fetchCompanyData";

export default function CompanyTable() {
  const companyList = useSelector((state) => state.company.companyList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyList = await fetchCompanyList();
        dispatch(updateCompanyList(companyList));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="font-semibold text-2xl px-2 py-4">Company</div>

      <div style={{ height: "70vh", width: "100%" }} className="mb-4">
        <div>
          <Link
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            to={"/company/create"}
          >
            New Company
          </Link>
        </div>
        <div className="mt-2">
          {companyList && (
            <DataGrid
              rows={companyList}
              getRowId={(row) => row.companyId} // Specify a unique id based on the companyId
              columns={companyData.columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              autoHeight={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
