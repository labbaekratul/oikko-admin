import React from 'react';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';

const create = () => {
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
                  title="Order Create"
                  url="/orders"
                ></Breadcrumb>
              </div>

              <div className="row justify-content-center">
                <div className="col-md-8">
                  <form>
                    <div className="card border-none shadow-sm my-3">
                      <div className="px-4 py-3 border-bottom">
                        <h5 className="boldh5">Order Create</h5>
                      </div>

                      <div className="formStyle px-5 py-3">
                        <div className="row">
                          <div className="col-8">
                            {/* product name */}
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Product Name"
                                autoFocus
                              />
                              <label>
                                Product Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>

                          <div className="col-4">
                            {/* product code */}
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Product Code"
                              />
                              <label>
                                Product Code{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default create;