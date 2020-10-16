import React, { Component } from "react";
import ReactDOM from "react-dom";


class Kurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: "",
      kurs_jual: "",
      kurs_beli: "",
      listkurs: [],
      isEdit: false,
      dataEdit: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  onChange(event) {
    this.setState({ bank: event.target.value});
  }
  onChangeKJ(event) {
    this.setState({ kurs_jual: event.target.value});
  }
  onChangeKB(event) {
    this.setState({ kurs_beli: event.target.value});
  }

  handleSubmit(event) {
    let param =`bank=${this.state.bank}&kurs_jual=${this.state.kurs_jual}&kurs_beli=${this.state.kurs_beli}`;
    event.preventDefault();
    return this.grep(
      "http://localhost:8080/kurs/create",
      "post",
      param,
    )
      .then((result) => {
        result.status = 200 ? this.componentDidMount() : console.warn(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.grep("http://localhost:8080/kurs", "get", null)
      .then((result) => {
        this.setState({
          listkurs: result,
        });
      })
      .catch((err) => console.error(err));
  }

  edit(id) {
    this.grep(`http://localhost:8080/kurs/${id}/edit`, "get", null)
      .then((result) => this.setState({ isEdit: true, dataEdit: result.data }))
      .catch((err) => console.error(err));
  }

  onChangeEdit(event) {
    let newDataEdit = { ...this.state.dataEdit, bank: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditKJ(event) {
    let newDataEdit = { ...this.state.dataEdit, kurs_jual: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditKB(event) {
    let newDataEdit = { ...this.state.dataEdit, kurs_beli: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }

  update(event) {
    let param =`bank=${this.state.dataEdit.bank}&kurs_jual=${this.state.dataEdit.kurs_jual}&kurs_beli=${this.state.dataEdit.kurs_beli}`;
    event.preventDefault();
    this.grep(
      `http://localhost:8080/kurs/${this.state.dataEdit.id_kurs}`,
      "put",
      param,
    )
      .then((result) => {
        this.componentDidMount();
      })
      .catch((err) => console.error(err));
  }

  delete(id) {
    this.grep(`http://localhost:8080/kurs/${id}`, "delete", null)
      .then((result) => this.componentDidMount())
      .catch((err) => console.error(err));
  }

  grep(url, method, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((respon) => respon.json())
        .then((ra) => {
          resolve(ra);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12">

              {this.state.isEdit ? (
                <form onSubmit={this.update}>
                  <div class="row">
                    <div class="col-md-4">
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.dataEdit.bank}
                        onChange={() => {
                          this.onChangeEdit(event);
                        }}
                      />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.kurs_jual}
                          onChange={() => {
                            this.onChangeEditKJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.kurs_beli}
                          onChange={() => {
                            this.onChangeEditKB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="Edit"
                        class="btn btn-warning"
                      >Edit</button>
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="close"
                        class="btn btn-danger"
                        onClick={() =>
                          this.setState({ isEdit: false, dataEdit: "" })
                        }
                      >Close</button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <div class="row">
                    <div class="col-md-4">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.bank}
                          onChange={this.onChange}
                          placeholder="Bank"
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.kurs_jual}
                          placeholder="Kurs Jual"
                          onChange={() => {
                            this.onChangeKJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.kurs_beli}
                          placeholder="Kurs Beli"
                          onChange={() => {
                            this.onChangeKB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                      <button
                        type="submit"
                        value="Add"
                        class="btn btn-success"
                      >Add</button>
                    </div>
                  </div>
                </form>
              )}
          </div>
        </div>
        <div class="row">
          <div class="col"><br/><br/>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Bank</th>
                  <th scope="col">Kurs Jual</th>
                  <th scope="col">Kurs Beli</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listkurs.map((item) => {
                  return (
                    <tr>
                      <td>{item.bank}</td>
                      <td>{item.kurs_jual}</td>
                      <td>{item.kurs_beli}</td>
                      <td>{item.date_created}</td>
                      <td>
                        <a
                          href="#"
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            this.edit(item.id_kurs);
                          }}
                        >
                          Edit
                        </a>&nbsp;&nbsp;
                        <a
                          href="#"
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            this.delete(item.id_kurs);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class Kurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erate_beli: "",
      erate_jual: "",
      ttcounter_beli: "",
      ttcounter_jual: "",
      listkurs: [],
      isEdit: false,
      dataEdit: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  onChange(event) {
    this.setState({ erate_jual: event.target.value});
  }
  onChangeEB(event) {
    this.setState({ erate_beli: event.target.value});
  }
  onChangeTB(event) {
    this.setState({ ttcounter_beli: event.target.value});
  }
  onChangeTJ(event) {
    this.setState({ ttcounter_jual: event.target.value});
  }

  handleSubmit(event) {
    let param =`erate_beli=${this.state.erate_beli}&erate_jual=${this.state.erate_jual}&ttcounter_beli=${this.state.ttcounter_beli}&ttcounter_jual=${this.state.ttcounter_jual}`;
    event.preventDefault();
    return this.grep(
      "http://localhost:8080/kurs_erate/create",
      "post",
      param,
    )
      .then((result) => {
        result.status = 200 ? this.componentDidMount() : console.warn(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.grep("http://localhost:8080/kurs_erate", "get", null)
      .then((result) => {
        this.setState({
          listkurs: result,
        });
      })
      .catch((err) => console.error(err));
  }

  edit(id) {
    this.grep(`http://localhost:8080/kurs_erate/${id}/edit`, "get", null)
      .then((result) => this.setState({ isEdit: true, dataEdit: result.data }))
      .catch((err) => console.error(err));
  }

  onChangeEdit(event) {
    let newDataEdit = { ...this.state.dataEdit, erate_jual: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditEB(event) {
    let newDataEdit = { ...this.state.dataEdit, erate_beli: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditTJ(event) {
    let newDataEdit = { ...this.state.dataEdit, ttcounter_jual: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditTB(event) {
    let newDataEdit = { ...this.state.dataEdit, ttcounter_beli: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }

  update(event) {
    let param =`erate_beli=${this.state.dataEdit.erate_beli}&erate_jual=${this.state.dataEdit.erate_jual}&ttcounter_beli=${this.state.dataEdit.ttcounter_beli}&ttcounter_jual=${this.state.dataEdit.ttcounter_jual}`;
    event.preventDefault();
    this.grep(
      `http://localhost:8080/kurs_erate/${this.state.dataEdit.id_kurs}`,
      "put",
      param,
    )
      .then((result) => {
        this.componentDidMount();
      })
      .catch((err) => console.error(err));
  }

  delete(id) {
    this.grep(`http://localhost:8080/kurs_erate/${id}`, "delete", null)
      .then((result) => this.componentDidMount())
      .catch((err) => console.error(err));
  }

  grep(url, method, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((respon) => respon.json())
        .then((ra) => {
          resolve(ra);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12">

              {this.state.isEdit ? (
                <form onSubmit={this.update}>
                  <div class="row">
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.dataEdit.erate_jual}
                        onChange={() => {
                          this.onChangeEdit(event);
                        }}
                      />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.erate_beli}
                          onChange={() => {
                            this.onChangeEditEB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.ttcounter_jual}
                          onChange={() => {
                            this.onChangeEditTJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.ttcounter_beli}
                          onChange={() => {
                            this.onChangeEditTB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="Edit"
                        class="btn btn-warning"
                      >Edit</button>
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="close"
                        class="btn btn-danger"
                        onClick={() =>
                          this.setState({ isEdit: false, dataEdit: "" })
                        }
                      >Close</button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <div class="row">
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.erate_jual}
                          placeholder="Erate Jual"
                          onChange={this.onChange}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.erate_beli}
                          placeholder="Erate Beli"
                          onChange={() => {
                            this.onChangeEB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.ttcounter_jual}
                          placeholder="Counter Jual"
                          onChange={() => {
                            this.onChangeTJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.ttcounter_beli}
                          placeholder="Counter Beli"
                          onChange={() => {
                            this.onChangeTB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                      <button
                        type="submit"
                        value="Add"
                        class="btn btn-success"
                      >Add</button>
                    </div>
                  </div>
                </form>
              )}
          </div>
        </div>
        <div class="row">
          <div class="col"><br/><br/>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Erate Jual</th>
                  <th scope="col">Erate Beli</th>
                  <th scope="col">Counter Jual</th>
                  <th scope="col">Counter Beli</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listkurs.map((item) => {
                  return (
                    <tr>
                      <td>{item.erate_jual}</td>
                      <td>{item.erate_beli}</td>
                      <td>{item.ttcounter_jual}</td>
                      <td>{item.ttcounter_beli}</td>
                      <td>{item.date_created}</td>
                      <td>
                        <a
                          href="#"
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            this.edit(item.id_kurs);
                          }}
                        >
                          Edit
                        </a>&nbsp;&nbsp;
                        <a
                          href="#"
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            this.delete(item.id_kurs);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class Usd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mata_uang: "",
      jual_week: "",
      jual_month: "",
      jual_threemonth: "",
      jual_sixmonth: "",
      listkurs: [],
      isEdit: false,
      dataEdit: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeEdit = this.onChangeEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  onChangeMU(event) {
    this.setState({ mata_uang: event.target.value});
  }
  onChange(event) {
    this.setState({ jual_week: event.target.value});
  }
  onChangeEB(event) {
    this.setState({ jual_month: event.target.value});
  }
  onChangeTJ(event) {
    this.setState({ jual_threemonth: event.target.value});
  }
  onChangeTB(event) {
    this.setState({ jual_sixmonth: event.target.value});
  }

  handleSubmit(event) {
    let param =`mata_uang=${this.state.mata_uang}&jual_week=${this.state.jual_week}&jual_month=${this.state.jual_month}&jual_threemonth=${this.state.jual_threemonth}&jual_sixmonth=${this.state.jual_sixmonth}`;
    event.preventDefault();
    return this.grep(
      "http://localhost:8080/usd_jual/create",
      "post",
      param,
    )
      .then((result) => {
        result.status = 200 ? this.componentDidMount() : console.warn(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.grep("http://localhost:8080/usd_jual", "get", null)
      .then((result) => {
        this.setState({
          listkurs: result,
        });
      })
      .catch((err) => console.error(err));
  }

  edit(id) {
    this.grep(`http://localhost:8080/usd_jual/${id}/edit`, "get", null)
      .then((result) => this.setState({ isEdit: true, dataEdit: result.data }))
      .catch((err) => console.error(err));
  }

  onChangeEditMU(event) {
    let newDataEdit = { ...this.state.dataEdit, mata_uang: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEdit(event) {
    let newDataEdit = { ...this.state.dataEdit, jual_week: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditEB(event) {
    let newDataEdit = { ...this.state.dataEdit, jual_month: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditTJ(event) {
    let newDataEdit = { ...this.state.dataEdit, jual_threemonth: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }
  onChangeEditTB(event) {
    let newDataEdit = { ...this.state.dataEdit, jual_sixmonth: event.target.value };
    this.setState({ dataEdit: newDataEdit });
  }

  update(event) {
    let param =`mata_uang=${this.state.dataEdit.mata_uang}&jual_week=${this.state.dataEdit.jual_week}&jual_month=${this.state.dataEdit.jual_month}&jual_threemonth=${this.state.dataEdit.jual_threemonth}&jual_sixmonth=${this.state.dataEdit.jual_sixmonth}`;
    event.preventDefault();
    this.grep(
      `http://localhost:8080/usd_jual/${this.state.dataEdit.id_usd}`,
      "put",
      param,
    )
      .then((result) => {
        this.componentDidMount();
      })
      .catch((err) => console.error(err));
  }

  delete(id) {
    this.grep(`http://localhost:8080/usd_jual/${id}`, "delete", null)
      .then((result) => this.componentDidMount())
      .catch((err) => console.error(err));
  }

  grep(url, method, body) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: method,
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      })
        .then((respon) => respon.json())
        .then((ra) => {
          resolve(ra);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-md-12">

              {this.state.isEdit ? (
                <form onSubmit={this.update}>
                  <div class="row">
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.dataEdit.mata_uang}
                        onChange={() => {
                          this.onChangeEditMU(event);
                        }}
                      />
                    </div>
                    <div class="col-md-2">
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.dataEdit.jual_week}
                        onChange={() => {
                          this.onChangeEdit(event);
                        }}
                      />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.jual_month}
                          onChange={() => {
                            this.onChangeEditEB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.jual_threemonth}
                          onChange={() => {
                            this.onChangeEditTJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.dataEdit.jual_sixmonth}
                          onChange={() => {
                            this.onChangeEditTB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="Edit"
                        class="btn btn-warning"
                      >Edit</button>
                    </div>
                    <div class="col-md-1">
                      <button
                        type="submit"
                        value="close"
                        class="btn btn-danger"
                        onClick={() =>
                          this.setState({ isEdit: false, dataEdit: "" })
                        }
                      >Close</button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <div class="row">
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.mata_uang}
                          placeholder="Mata Uang"
                          onChange={() => {
                            this.onChangeMU(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.jual_week}
                          placeholder="1 Minggu"
                          onChange={this.onChange}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.jual_month}
                          placeholder="1 Bulan"
                          onChange={() => {
                            this.onChangeEB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.jual_threemonth}
                          placeholder="3 Bulan"
                          onChange={() => {
                            this.onChangeTJ(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.jual_sixmonth}
                          placeholder="6 Bulan"
                          onChange={() => {
                            this.onChangeTB(event);
                          }}
                        />
                    </div>
                    <div class="col-md-2">
                      <button
                        type="submit"
                        value="Add"
                        class="btn btn-success"
                      >Add</button>
                    </div>
                  </div>
                </form>
              )}
          </div>
        </div>
        <div class="row">
          <div class="col"><br/><br/>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Mata Uang</th>
                  <th scope="col">1 Minggu</th>
                  <th scope="col">1 Bulan</th>
                  <th scope="col">3 Bulan</th>
                  <th scope="col">6 Bulan</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listkurs.map((item) => {
                  return (
                    <tr>
                      <td>{item.mata_uang}</td>
                      <td>{item.jual_week}</td>
                      <td>{item.jual_month}</td>
                      <td>{item.jual_threemonth}</td>
                      <td>{item.jual_sixmonth}</td>
                      <td>{item.date_created}</td>
                      <td>
                        <a
                          href="#"
                          class="btn btn-primary btn-sm"
                          onClick={() => {
                            this.edit(item.id_usd);
                          }}
                        >
                          Edit
                        </a>&nbsp;&nbsp;
                        <a
                          href="#"
                          class="btn btn-danger btn-sm"
                          onClick={() => {
                            this.delete(item.id_usd);
                          }}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

let cont_kurs = document.getElementById("kurs");
let comp_kurs = <Kurs />;
ReactDOM.render(comp_kurs, cont_kurs);

let cont_kurse = document.getElementById("kurse");
let comp_kurse = <Kurse />;
ReactDOM.render(comp_kurse, cont_kurse);

let cont_usd = document.getElementById("usd");
let comp_usd = <Usd />;
ReactDOM.render(comp_usd, cont_usd);

export { Kurs, Kurse, Usd };
