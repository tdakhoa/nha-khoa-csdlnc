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
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
} from "@mui/material";
import {
  CreateOutlined,
  Delete,
  DeleteOutlined,
  FilterList,
  LockOutlined,
} from "@mui/icons-material";

import { Button, TextField, Typography } from "../../components";
import axios from "axios";

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
          {numSelected} loại thuốc đã được chọn
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
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allowAnimation, setAllowAnimation] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(fetchData);
  const [render, setRender] = React.useState(false);

  let [drug, setDrug] = React.useState<Array<any>>([]);
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/XemThuoc`)
      .then((res) => {
        console.log(res);
        setDrug(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (drug: any) => {
    setOpen(true);
    let temp: any = fetchData.map((e: any, i) => {
      return { ...e, value: Object.values(drug)[i] };
    });
    setData(temp);
  };

  const deleteDrug = async (id: string) => {
    console.log(id);
    axios
      .post(`http://localhost:5000/XoaThuoc/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
    axios
      .get(`http://localhost:5000/XemThuoc`)
      .then((res) => {
        console.log(res);
        setDrug(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleChange = (e: any, i: any) => {
    fetchData[i].value = e.currentTarget.value;
    setData(fetchData);
    setRender(!render);
  };

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
      const newSelected = drug.map((n) => n.MaThuoc);
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
              rowCount={drug.length}
            />
            <TableBody>
              {stableSort(drug, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  const isItemSelected = isSelected(row.MaThuoc);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      sx={{ whiteSpace: "nowrap" }}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.MaThuoc}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event: any) =>
                            handleClick(event, row.MaThuoc)
                          }
                          color="primary"
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.MaThuoc}</Typography>
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
                          {row.TenThuoc}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.DonGia}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.DonViTinh}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <ActionCell
                          edit={() => handleOpen(row)}
                          delete={() => deleteDrug(row.MaThuoc)}
                        />
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
          count={drug.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cập nhật thuốc</DialogTitle>
        <DialogContent>
          <InputContainer container spacing={3}>
            {data.map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <TextField
                  label={item.label}
                  value={item.value}
                  onChange={(e) => handleChange(e, i)}
                />
              </Grid>
            ))}
          </InputContainer>
        </DialogContent>
        <DialogActions>
          <Button bgcolor="gray" onClick={handleClose} sx={{ width: "7rem" }}>
            Thoát
          </Button>
          <Button
            bgcolor="secondary"
            onClick={handleClose}
            sx={{ width: "7rem" }}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </EnhancedTableBox>
  );
}

const ActionCell = (props: any) => {
  return (
    <Box sx={StyledActionCell}>
      <IconButton>
        <CreateOutlined onClick={props.edit} />
      </IconButton>
      <IconButton>
        <DeleteOutlined onClick={props.delete} />
      </IconButton>
    </Box>
  );
};

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID thuốc",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Tên thuốc",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Đơn giá",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Đơn vị tính",
  },
];

interface Data {
  id: string;
  name: string;
  price: string;
  amount: string;
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

const InputContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  marginLeft: "0",
  padding: "12px 16px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 0,
  },
}));

const fetchData = [
  { label: "ID thuốc", value: "" },
  { label: "Tên thuốc", value: "" },
  { label: "Đơn giá", value: "" },
  { label: "Đơn vị tính", value: "" },
];
