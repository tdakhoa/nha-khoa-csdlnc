import * as React from "react";
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
  IconButton,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import axios from "axios";

import { Typography } from "../../components";
import moment from "moment";

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "var(--palette-02)",
          color: "white",
          whiteSpace: "nowrap",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="center">
            <Typography weight="bold" color="white">
              {headCell.label}
            </Typography>
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

export default function EnhancedTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [schedure, setSchedure] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `http://localhost:5000/XemDanhSachThanhToanCuaBenhNhan?MaBenhNhan=${props.MABN}`
      )
      .then((res) => {
        console.log(res);
        setSchedure(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [props.MABN]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <EnhancedTableBox>
      <Box>
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
            <EnhancedTableHead />
            <TableBody>
              {schedure
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow sx={{ whiteSpace: "nowrap" }} key={row.MaLichHen}>
                      <TableCell align="left">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Typography
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              whiteSpace: "nowrap",
                              maxWidth: "14rem",
                            }}
                            size="p"
                          >
                            {row.MaThanhToan}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.NgayGiaoDich}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">{row.TongTien}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p">
                          {moment(row.Datra).format("DD-MM-YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography size="p"> {row.TienThoi}</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Typography
                            size="p"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              whiteSpace: "nowrap",
                              maxWidth: "14rem",
                            }}
                          >
                            {row.LoaiThanhToan}
                          </Typography>
                        </Box>
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
          count={schedure.length}
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

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Mã Thanh toán",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Ngày giao dịch",
  },
  {
    id: "writer",
    numeric: true,
    disablePadding: false,
    label: "Tổng tiền",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Đã trả",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Tiền thối",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Loại thanh toán",
  },
];

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
