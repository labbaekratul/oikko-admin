/* eslint-disable react-hooks/exhaustive-deps */
import { Axios } from 'axios';
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
import { deleteEntrepreneurs, editEntrepreneurs, getEntrepreneurs } from '../../redux/Actions/entrepreneursActions';
import { ENTREPRENEURS_CREATE_RESET, ENTREPRENEURS_DELETE_RESET, ENTREPRENEURS_UPDATE_RESET } from '../../redux/Constants/entrepreneursConstants';

const Entrepreneurs = () => {
  const history = useHistory();
  const dispatch = useDispatch();


  const allEntrepreneurs = useSelector((state) => state.entrepreneurs);
  const { entrepreneurs } = allEntrepreneurs;
  
  const entrepreneurCreate = useSelector((state) => state.entrepreneursCreate);
  const { success: successCreate } = entrepreneurCreate;

  const entrepreneurUpdate = useSelector((state) => state.entrepreneursUpdate);
  const { success: successUpdate } = entrepreneurUpdate;
  
  const entrepreneurDelete = useSelector((state) => state.entrepreneursDelete);
  const { success: successDelete } = entrepreneurDelete;

  // all api call
  useEffect(() => {
    // all entrepreneurs
    dispatch(getEntrepreneurs());

    // create
    if (successCreate) {
      dispatch({
        type: ENTREPRENEURS_CREATE_RESET,
      });
    }

    // update
    if (successUpdate) {
      dispatch({
        type: ENTREPRENEURS_UPDATE_RESET,
      });
    }

    if (successDelete) {
      dispatch({
        type: ENTREPRENEURS_DELETE_RESET,
      });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // Handle Button Delete
  const handleDelete = (entrepreneurId, data) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteEntrepreneurs(entrepreneurId));
      // image delete
      Axios.post(
        "https://oikko-online-shopping.herokuapp.com/api/uploads/delete",
        {
          Bucket: data.entimage.bucketName,
          Key: data.entimage.key,
        }
      );
      // image delete
      Axios.post(
        "https://oikko-online-shopping.herokuapp.com/api/uploads/delete",
        {
          Bucket: data.nidImgBackPart.bucketName,
          Key: data.nidImgBackPart.key,
        }
      );
      // image delete
      Axios.post(
        "https://oikko-online-shopping.herokuapp.com/api/uploads/delete",
        {
          Bucket: data.nidImgFrontPart.bucketName,
          Key: data.nidImgFrontPart.key,
        }
      );
    }
  };

  // multiple delete
  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      productId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteEntrepreneurs(deleteId));
      });
    }
  };
  // edit
  const handleEdit = (id) => {
    if (id) {
      dispatch(editEntrepreneurs(id));
      history.push(`/entrepreneur/${id}/edit`);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: (props) => (
          <img src={props.row.original?.image?.url} width={60} alt="Image" />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Division",
        accessor: "division",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;
          const entimage = props.row.original.image;
          const nidImgFrontPart = props.row.original.nidImgFrontPart;
          const nidImgBackPart = props.row.original.nidImgBackPart;

          const image = {
            entimage,
            nidImgFrontPart,
            nidImgBackPart,
          };

          return (
            <div>
              <button
                type="button"
                className="me-1"
                onClick={() => handleEdit(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button type="button" onClick={() => handleDelete(rowIdx, image)}>
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
      entrepreneurs?.map((data) => ({
        id: data._id,
        image: data?.image?.data,
        nidImgFrontPart: data?.nidImgFrontPart?.data,
        nidImgBackPart: data?.nidImgBackPart?.data,
        name: data.name,
        email: data.email,
        phone: data.phone,
        division: data.division,
        address: data.address,
      })),
    [entrepreneurs]
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
                  title="Entrepreneurs"
                  url="/entrepreneur/create"
                ></Breadcrumb>
                {/* table of content */}
                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/entrepreneur/create"}
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

export default Entrepreneurs;