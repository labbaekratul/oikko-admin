/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import Loading from "../../Component/Loading/Loading";
import SideBar from '../../Component/SideBar/SideBar';
import Styles from "../../Component/Table/Styles";
import Table from "../../Component/Table/Table";
import TopBar from '../../Component/TopBar/TopBar';
import { deleteUser, userDetails, users } from '../../redux/Actions/userAuthAction';
import { USER_DELETE_RESET, USER_REGISTER_RESET, USER_UPDATE_RESET } from '../../redux/Constants/userAuthConstant';

const Users = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // user state
  const getUsers = useSelector((state) => state.users);
  const { users: allUsers } = getUsers;

  // user create
  const userCreate = useSelector((state) => state.userRegister);
  const { success: successCreate } = userCreate;
  // update user
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;
  // delete user
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  // user list dispatch
  useEffect(() => {
    dispatch(users());

    if (successCreate) {
      dispatch({ type: USER_REGISTER_RESET });
    }
    // update user
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    // delete user
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [dispatch, successUpdate, successDelete, successCreate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(id));
    }
  };
  // multiple delete
  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      productId.map((x) => {
        const deleteId = x.original.id;
        console.log(deleteId);
        return dispatch(deleteUser(deleteId));
      });
    }
  };

  // edit size
  const handleEdit = (editId) => {
    if (editId) {
      dispatch(userDetails(editId));
      history.push(`/user/${editId}/edit`);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Sl",
        accessor: "Sl",
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
        Header: "isAdmin",
        accessor: "isAdmin",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;
          return (
            <div>
              <Link
                onClick={() => handleEdit(rowIdx)}
                to={`/user/${rowIdx}/edit`}
                className="me-1 editLink"
              >
                <BsPencil className="BsPencil" />
              </Link>

              <button type="button" onClick={() => handleDelete(rowIdx)}>
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [handleDelete,handleEdit]
  );

  const data = useMemo(
    () =>
      allUsers?.map((data, index) => ({
        id: data._id,
        Sl: index + 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        isAdmin: data.isAdmin ? "Yes" : "No",
      })),
    [allUsers]
  );

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col__10" id="dashboard_body">
            <TopBar />
            <HeaderPart />
            <div className="ds_body">
              <div className="row">
                <div className="col-md-12 d-flex align-items-center justify-content-between mb-5 breadcrumbPart">
                  <div>
                    <h3>Dashboard</h3>
                  </div>

                  <nav>
                    <ol className="breadcrumb d-flex">
                      <p>You are here : &nbsp;</p>
                      <li className="breadcrumb-item">
                        <Link className="LinkColor" to="/">
                          Dashboard
                        </Link>
                      </li>

                      <li className="breadcrumb-item active">User List</li>
                    </ol>
                  </nav>
                </div>
                
                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <h3 className="mb-3">User List</h3>
                  <div className="row">
                    <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                      <Styles>
                        <div className="tableWrap">
                          {!data ? (
                            <Loading />
                          ) : (
                            <Table
                              columns={columns}
                              data={data}
                              url={"/user/create"}
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

        </div>
      </div>
    </section>
  );
};

export default Users;