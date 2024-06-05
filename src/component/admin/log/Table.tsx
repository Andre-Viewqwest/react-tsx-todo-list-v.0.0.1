import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";
import { Button } from "@mantine/core";

interface DataItems {
  id: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const SEPARATOR = ",";
const shouldComponentUpdate = () => true;
const gridStyle: React.CSSProperties = { minHeight: 550 };

const Table: React.FC = () => {
  const gridRef = useRef<any>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState<DataItems[]>([]);

  window.moment = moment;

  const [data, setData] = useState<DataItems[]>([
    {
      id: "1",
      image: "https://example.com/image.jpg",
      description: "A sample image description.",
      created_at: "2024-06-05 14:13:44",
      updated_at: "2024-06-05 14:13:44",
    },
    {
      id: "2",
      image: "https://example.com/another-image.jpg",
      description: "Another sample image description.",
      created_at: "2024-06-04 14:14:08",
      updated_at: "2024-06-04 14:14:08",
    },
  ]);

  const filter = [
    { name: "id", operator: "startsWith", type: "string", value: "" },
    { name: "image", operator: "startsWith", type: "string", value: "" },
    { name: "description", operator: "startsWith", type: "string", value: "" },
    { name: "created_at", operator: "eq", type: "date", value: "" },
    { name: "updated_at", operator: "eq", type: "date", value: "" },
  ];

  useEffect(() => {
    setFilteredData(data); // Initialize filtered data
  }, [data]);

  const onFilterValueChange = (newFilterValue: any) => {
    const newFilteredData = data.filter((item) => {
      return newFilterValue.every((filter: any) => {
        if (!filter.value) return true;
        const value = item[filter.name].toString();
        if (filter.operator === "startsWith") {
          return value.startsWith(filter.value);
        } else if (filter.operator === "eq" && filter.type === "date") {
          return moment(value).isSame(filter.value, "day");
        }
        return true;
      });
    });
    setFilteredData(newFilteredData);
  };

  const columns = [
    {
      name: "id",
      header: "Id",
      minWidth: 50,
      defaultFlex: 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
    },
    {
      name: "image",
      header: "Image",
      minWidth: 50,
      defaultFlex: 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
    },
    {
      name: "description",
      header: "Description",
      minWidth: 50,
      defaultFlex: 1,
      cellProps: { align: "center" },
      shouldComponentUpdate,
    },
    {
      name: "created_at",
      header: "Created At",
      minWidth: 50,
      defaultFlex: 1,
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
      minWidth: 50,
      defaultFlex: 1,
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
    const fileName = `users-radius-server-${month}-${day}-${year}.csv`;

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
          color="red"
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
