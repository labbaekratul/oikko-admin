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
import { deleteBlog, detailsBlog, getBlogs } from '../../redux/Actions/blogActions';
import { BLOG_CREATE_RESET, BLOG_DELETE_RESET, BLOG_UPDATE_RESET } from '../../redux/Constants/blogConstants';

const Blogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // redux store get data
  const allBlogData = useSelector((state) => state.blogs);
  const { blogs } = allBlogData;
  const blogCreate = useSelector((state) => state.blogCreate);
  const { success: successCreate } = blogCreate;
  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { success: successUpdate } = blogUpdate;
  const blogDelete = useSelector((state) => state.blogDelete);
  const { success: successDelete } = blogDelete;

  // blog get action data
  useEffect(() => {
    dispatch(getBlogs());

    if (successCreate) {
      dispatch({ type: BLOG_CREATE_RESET });
    }
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
    }
    if (successDelete) {
      dispatch({ type: BLOG_DELETE_RESET });
    }
  }, [dispatch, successCreate, successUpdate, successDelete]);

  // delete
  const handleButtonDelete = (blogId, image) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteBlog(blogId));
      image.map((img) =>
        Axios.post(
          "https://oikko-online-shopping.herokuapp.com/api/uploads/delete",
          {
            Bucket: img.bucketName,
            Key: img.key,
          }
        )
      );
    }
  };
  // multiple delete
  const handleDeleteClick = (productId) => {
    if (window.confirm("Are you sure to delete?")) {
      productId.map((x) => {
        const deleteId = x.original.id;
        return dispatch(deleteBlog(deleteId));
      });
    }
  };

  // edit
  const handleBlogDetails = (id) => {
    if (id) {
      dispatch(detailsBlog(id));
      history.push(`/blog/${id}/edit`);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: (props) => (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={props.row.original?.image[0]?.url} width={60} alt="Image" />
        ),
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Writter Name",
        accessor: "blogWritter",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Featured",
        accessor: "featured",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.original.id;
          const image = props.row.original.image;
          return (
            <div>
              <button
                type="button"
                className="me-1"
                onClick={() => handleBlogDetails(rowIdx)}
              >
                <BsPencil className="BsPencil" />
              </button>

              <button
                type="button"
                onClick={() => handleButtonDelete(rowIdx, image)}
              >
                <BsTrash className="BsTrash" />
              </button>
            </div>
          );
        },
      },
    ],

    [handleBlogDetails, handleButtonDelete]
  );

  const data = useMemo(
    () =>
      blogs?.map((data) => ({
        id: data._id,
        image: data?.image,
        title: data.title,
        category: data.category,
        blogWritter: data.blogWritter.name,
        status: data.status ? "Yes" : "No",
        featured: data.featured ? "Yes" : "No",
      })),
    [blogs]
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
                  title="Blog List"
                  url="/admin/blog/create"
                ></Breadcrumb>

                <div className="col-md-12 bg-white rounded-3 shadow-lg p-4">
                  <Styles>
                    <div className="tableWrap">
                      {!data ? (
                        <Loading />
                      ) : (
                        <Table
                          url={"/blog/create"}
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

export default Blogs;