/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from '../../Component/Loading/Loading';
import SideBar from '../../Component/SideBar/SideBar';
import Styles from '../../Component/Table/Styles';
import Table from '../../Component/Table/Table';
import TopBar from '../../Component/TopBar/TopBar';
import { getOrders } from '../../redux/Actions/orderActions';
import { ORDER_CREATE_RESET, ORDER_DELETE_RESET, ORDER_UPDATE_RESET } from '../../redux/Constants/orderConstants';

const Orders = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // get order
  const getorders = useSelector((state) => state.orders);
  const { orders } = getorders;
  // order create
  const bannerCreate = useSelector((state) => state.bannerCreate);
  const { success: successCreate } = bannerCreate;
  // order update
  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const { success: successUpdate } = bannerUpdate;
  // order delete
  const bannerDelete = useSelector((state) => state.bannerDelete);
  const { success: successDelete } = bannerDelete;

  useEffect(() => {
    // get order
    dispatch(getOrders({}));
    // create order
    if (successCreate) {
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // update order
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
    }
    // delete order
    if (successDelete) {
      dispatch({ type: ORDER_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // edit order
  const handleEdit = (id) => {
    if (id) {
      history.push(`/order/${id}/edit`);
    }
  };

  // delete order handle
  const handleDelete = (deleteId, data) => {
    if (window.confirm("Are you sure to delete?")) {
      console.log("hello world");
    }
  };

  // multiple delete
  const handleDeleteClick = (mltDeleteId) => {
    if (window.confirm("Are you sure to delete?")) {
      mltDeleteId.map((x) => {
        const deleteId = x.original.id;
        return deleteId;
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
      },
      {
        Header: "User Name",
        accessor: "fullName",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Grand Total",
        accessor: "grandTotal",
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
      },
      {
        Header: "Order Status",
        accessor: "orderStatus",
      },
      {
        Header: "Received At",
        accessor: "createdAt",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;

          return (
            <div>
              <button
                type="button"
                className="me-1"
                onClick={() => handleEdit(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button type="button" onClick={() => handleDelete(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [handleDelete, handleEdit]
  );

  const data = useMemo(
    () =>
      orders?.orders?.map((data) => ({
        id: data._id,
        orderId: "OIK - " + data.orderId,
        fullName: data.shippingAddress.fullName,
        phone: data.shippingAddress.phone,
        grandTotal: "৳ " + data.grandTotal.toFixed(2),
        paymentMethod: data.paymentMethod,
        orderStatus: data.orderStatus,
        createdAt: data.createdAt.split("T")[0],
      })),
    [orders]
  );
  
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <div className="row">
                <Breadcrumb
                  title="Orders"
                  url="/order/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/order/create"}
                          columns={columns}
                          data={data}
                          handleDeleteClick={handleDeleteClick}
                        ></Table>
                      )}
                    </div>
                  </Styles>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;