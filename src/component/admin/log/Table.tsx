import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Button } from "@mantine/core";

import DateFilter from "@inovua/reactdatagrid-community/DateFilter";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import { useMediaQuery } from "@mantine/hooks";

interface DataItems {
  id: string;
  image: string;
  description: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const SEPARATOR = ",";
const shouldComponentUpdate = () => true;
const gridStyle: React.CSSProperties = { minHeight: 550 };

const Table: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  window.moment = moment;
  const gridRef = useRef<any>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState<DataItems[]>([]);

  // CHANGES | Put all data here
  const [data] = useState<DataItems[]>([
    {
      id: "1",
      image: "https://example.com/image.jpg",
      description: "A sample image description.",
      role: "ADMIN",
      created_at: "2024-06-05 14:13:44",
      updated_at: "2024-06-05 14:13:44",
    },
    {
      id: "2",
      image: "https://example.com/another-image.jpg",
      description: "Another sample image description.",
      role: "USER",
      created_at: "2024-06-04 14:14:08",
      updated_at: "2024-06-04 14:14:08",
    },
    {
      id: "3",
      image: "https://example.com/another-image.jpg",
      description: "Test Description",
      role: "SUPER_ADMIN",
      created_at: "2024-06-03 14:14:08",
      updated_at: "2024-06-03 14:14:08",
    },
  ]);

  // CHANGES | Add filter here | Current filter are | SELECT | DATE | STRING |
  const filter = [
    { name: "id", operator: "startsWith", type: "string", value: "" },
    { name: "image", operator: "startsWith", type: "string", value: "" },
    { name: "description", operator: "startsWith", type: "string", value: "" },
    {
      name: "role",
      operator: "inlist",
      type: "select",
      value: [],
    },
    { name: "created_at", operator: "eq", type: "date", value: "" },
    { name: "updated_at", operator: "eq", type: "date", value: "" },
  ];

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // CHANGES | When add filter add here also so when you export csv its included
  const onFilterValueChange = (newFilterValue: any) => {
    const newFilteredData = data.filter((item: any) => {
      return newFilterValue.every((filter: any) => {
        if (!filter.value || filter.value.length === 0) return true;

        const value = item[filter.name].toString();

        // CHANGES | On this condition you put what you added filter
        if (filter.operator === "startsWith") {
          return value.startsWith(filter.value);
        } else if (filter.operator === "eq" && filter.type === "date") {
          return moment(value).isSame(filter.value, "day");
        } else if (filter.operator === "inlist" && filter.type === "select") {
          return filter.value.includes(value);
        }
        return true;
      });
    });
    setFilteredData(newFilteredData);
  };

  // CHANGES | This is for data of table and header
  const columns = [
    // {
    //   name: "id",
    //   header: "Id",
    //   minWidth: 50,
    //   defaultFlex: 1,
    //   cellProps: { align: "center" },
    //   shouldComponentUpdate,
    // },
    {
      name: "image",
      header: "Image",
      minWidth: isMobile ? 300 : 50,
      defaultFlex: isMobile ? undefined : 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
    },
    {
      name: "description",
      header: "Description",
      minWidth: isMobile ? 300 : 50,
      defaultFlex: isMobile ? undefined : 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
    },
    {
      name: "role",
      header: "Role",
      minWidth: isMobile ? 300 : 50,
      defaultFlex: isMobile ? undefined : 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
      filterEditor: SelectFilter,
      filterEditorProps: {
        multiple: true,
        wrapMultiple: false,
        defaultValue: [],
        dataSource: ["ADMIN", "USER", "SUPER_ADMIN"].map((c) => {
          return { id: c, label: c };
        }),
      },
    },

    {
      name: "created_at",
      header: "Created At",
      minWidth: isMobile ? 300 : 50,
      defaultFlex: isMobile ? undefined : 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
      filterEditor: DateFilter,
      dateFormat: "YYYY-MM-DD",
      render: ({ data }) => {
        return moment(data.created_at).format("MMMM D, YYYY h:mma");
      },
    },
    {
      name: "updated_at",
      header: "Updated At",
      minWidth: isMobile ? 300 : 50,
      defaultFlex: isMobile ? undefined : 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
      filterEditor: DateFilter,
      dateFormat: "YYYY-MM-DD",
      render: ({ data }) => {
        return moment(data.updated_at).format("MMMM D, YYYY h:mma");
      },
    },
  ];

  const toggleRowSelection = (rowId: string) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      const newSelectedRowIds = new Set(prevSelectedRowIds);
      if (newSelectedRowIds.has(rowId)) {
        newSelectedRowIds.delete(rowId);
      } else {
        newSelectedRowIds.add(rowId);
      }
      return newSelectedRowIds;
    });
  };

  const handleHeaderCheckboxChange = () => {
    if (selectAll) {
      setSelectedRowIds(new Set());
    } else {
      const allRowIds = new Set(filteredData.map((row: DataItems) => row.id));
      setSelectedRowIds(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  const checkboxColumn = {
    header: () => (
      <input
        type="checkbox"
        onChange={handleHeaderCheckboxChange}
        checked={selectAll}
      />
    ),
    renderCheckbox: (checkboxProps: any, cellProps: any) => {
      const rowId = cellProps.data.id;
      const isChecked = selectedRowIds.has(rowId);

      return (
        <input
          type="checkbox"
          onChange={(e) => {
            e.stopPropagation();
            toggleRowSelection(rowId);
          }}
          checked={isChecked}
        />
      );
    },
  };

  const exportCSV = () => {
    // CHANGES | THIS IS SPECIFY THE DATA WANT TO EXPORT BASE ON COLUMNS
    const Columns = [
      { name: "id" },
      { name: "image" },
      { name: "description" },
      { name: "created_at" },
      { name: "updated_at" },
    ];

    const header = Columns.map((c) => c.name).join(SEPARATOR);

    let selectedRows;
    if (selectedRowIds.size > 0) {
      selectedRows = filteredData.filter((row: DataItems) =>
        selectedRowIds.has(row.id)
      );
    } else {
      selectedRows = filteredData;
    }

    const rows = selectedRows.map((data) =>
      Columns.map((c) => data[c.name]).join(SEPARATOR)
    );

    const contents = [header].concat(rows).join("\n");

    const blob = new Blob([contents], { type: "text/csv;charset=utf-8;" });

    const date = new Date();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toLowerCase();
    const day = date.getDate();
    const year = date.getFullYear();

    // CHANGES | THIS IS FOR NAME
    const fileName = `todo-${month}-${day}-${year}.csv`;

    downloadBlob(blob, fileName);
  };

  const downloadBlob = (blob: Blob, fileName: string) => {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.position = "absolute";
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mb-4">
        <Button
          variant="filled"
          className="bg-blue-500 text-white border-none hover:bg-blue-600"
          onClick={() => {
            exportCSV();
          }}
        >
          Export
        </Button>
      </div>

      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={filteredData}
        defaultFilterValue={filter}
        style={gridStyle}
        pagination
        defaultLimit={50}
        checkboxColumn={checkboxColumn}
        onFilterValueChange={onFilterValueChange}
        ref={gridRef}
      />
    </>
  );
};

export default Table;
