/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useMemo, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from '../../Component/Loading/Loading';
import SideBar from '../../Component/SideBar/SideBar';
import Styles from '../../Component/Table/Styles';
import Table from '../../Component/Table/Table';
import TopBar from '../../Component/TopBar/TopBar';
import { allProduct, deleteProduct } from '../../redux/Actions/productActions';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, PRODUCT_UPDATE_RESET } from '../../redux/Constants/productContants';

const Products = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  // get all product
  const getProduct = useSelector((state) => state.products);
  const { products } = getProduct;
  // product create success
  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate } = productCreate;
  // product delete
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  // product update
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  // all actions
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }

    dispatch(allProduct({ name: name !== "all" ? name : "" }));
  }, [dispatch, history, successDelete, successCreate, successUpdate]);

  
  // delete
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product));
    }
  };

  // multiple delete
  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      productId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteProduct(deleteId));
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: (props) => (
          <div style={{ width: "70px", height: "70px" }}>
            <img
              style={{ borderRadius: "5px", width: "100%", height: "100%" }}
              className="shadow-sm"
              src={props.row.original.image}
              width={60}
              alt="Image"
            />
          </div>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "SellPrice",
        accessor: "sellPrice",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;
          return (
            <div>
              <Link
                to={`/product/${rowIdx}/edit`}
                className="me-1 editLink"
              >
                <BsPencil className="BsPencil" />
              </Link>

              <button type="button" onClick={() => deleteHandler(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],
    [deleteHandler]
  );

  const data = useMemo(
    () =>
      products?.products?.map((data) => ({
        id: data._id,
        image: data.displayImage.data?.url,
        name: data.name,
        sellPrice: `${data.sellPrice} Tk`,
      })),
    [products]
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
                  title="Products"
                  url="/product/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {data ? (
                          <Table
                            columns={columns}
                            data={data}
                            handleDeleteClick={handleDeleteClick}
                            url={"/product/create"}
                          />
                        ) : (
                          <Loading />
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

export default Products;