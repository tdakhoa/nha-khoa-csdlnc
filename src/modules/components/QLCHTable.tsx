import * as React from "react";

import { alpha } from "@mui/material/styles";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Checkbox,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Css,
  Delete,
  DeleteOutlined,
  EditOutlined,
  FilterList,
  VisibilityOutlined,
} from "@mui/icons-material";
import useFetch from "./../../hooks/useFetch";
import { Typography } from "../../components";

const createData = (
  title: string,
  category: string,
  writer: string,
  date: string,
  time: string,
  status: string
): Data => {
  return {
    title,
    category,
    writer,
    date,
    time,
    status,
  };
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "var(--palette-02)",
          color: "white",
          whiteSpace: "nowrap",
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: "white !important" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={matches ? true : orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ "& svg": { color: "white !important" } }}
            >
              <Typography weight="bold" color="white">
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <Typography weight="bold" color="white">
            Hành động
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
          display: "flex",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} size="p">
          {numSelected} cuộc hẹn đã được chọn
        </Typography>
      ) : (
        <></>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("category");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allowAnimation, setAllowAnimation] = React.useState(false);
  const schedule =
    useFetch("http://localhost:5000/LocCuocHenTrongNgay").data || [];
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = schedule.map((n: any) => n?.MaLichHen);
      setAllowAnimation(true);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, title: string) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setAllowAnimation(true);
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (title: string) => selected.indexOf(title) !== -1;

  return (
    <EnhancedTableBox>
      {selected.length > 0 ? (
        <EnhancedTableToolbar numSelected={selected.length} />
      ) : (
        <></>
      )}
      <Box
        sx={
          allowAnimation
            ? {
                transition: "all 0.3s ease-in-out",
                ...(selected.length > 0
                  ? {
                      "@keyframes slide1": {
                        "0%": { transform: "translateY(-15.1%)" },
                      },
                      animation: "slide1 0.3s forwards",
                    }
                  : {
                      "@keyframes slide2": {
                        "0%": { transform: "translateY(15.1%)" },
                      },
                      animation: "slide2 0.3s forwards",
                    }),
              }
            : {}
        }
      >
        <TableContainer
          sx={{
            "&::-webkit-scrollbar": {
              height: "0.3rem",
            },
          }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={schedule.length}
            />
            <TableBody>
              {stableSort(schedule, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row.MaLichHen);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      sx={{ whiteSpace: "nowrap" }}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.MaLichHen}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event: any) =>
                            handleClick(event, row.MaLichHen)
                          }
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            whiteSpace: "nowrap",
                            maxWidth: "10rem",
                          }}
                          size="p"
                        >
                          {row.TenBN}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.KhamChinh}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.TroKham}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.MaPK}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          size="p"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            whiteSpace: "nowrap",
                            maxWidth: "5rem",
                          }}
                        >
                          {row.Ngay}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          size="p"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                            whiteSpace: "nowrap",
                            maxWidth: "2rem",
                          }}
                        >
                          {row.TinhTrang}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <ActionCell />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            "&::-webkit-scrollbar": {
              height: "0.3rem",
            },
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </EnhancedTableBox>
  );
}

const ActionCell = () => {
  return (
    <Box sx={StyledActionCell}>
      <IconButton>
        <VisibilityOutlined />
      </IconButton>
      <IconButton>
        <EditOutlined />
      </IconButton>
      <IconButton>
        <DeleteOutlined />
      </IconButton>
    </Box>
  );
};

const rows = [
  createData(
    "Phan Văn Thức",
    "Lê Văn Sĩ",
    "Hồ Ngọc Đức",
    "P001",
    "14:00",
    "Cuộc hẹn mới"
  ),
  createData(
    "Trần Hoàng Sinh",
    "Trần Hoàng Ý",
    "Lê Văn Sĩ",
    "P002",
    "15:00",
    "Tái khám"
  ),
  createData(
    "Nguyễn Tấn Hùng",
    "Lê Văn Sĩ",
    "Trần Hoàng Ý",
    "P003",
    "17:30",
    "Cuộc hẹn mới"
  ),
  createData(
    "Trần Nhân Phước",
    "Trần Hoàng Ý",
    "Hồ Ngọc Đức",
    "P004",
    "12:00",
    "Tái khám"
  ),
  createData(
    "Lê Thiên Anh",
    "Lê Văn Sĩ",
    "Trần Hoàng Ý",
    "P005",
    "9:30",
    "Tái khám"
  ),
];

const headCells: readonly HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Họ Tên",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Nha sĩ",
  },
  {
    id: "writer",
    numeric: true,
    disablePadding: false,
    label: "Trợ khám",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Phòng",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Thời gian",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Tình trạng",
  },
];

interface Data {
  category: string;
  date: string;
  writer: string;
  title: string;
  time: string;
  status: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const StyledActionCell = {
  display: "flex",
};

const EnhancedTableBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "20px",
  border: "1px solid #f2eae1",
  borderRadius: "8px",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
}));
