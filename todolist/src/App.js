import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Add from "@material-ui/icons/AddCircle";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
const uuidv1 = require("uuid/v1");

const apiPath = "https://eee.zylowski.pl/api/task";

class App extends React.Component {
  constructor(props) {
    super(props);
    let savedState = null;

    this.state = savedState || {
      loading: true,
      newTask: "",
      tasks: []
    };
  }
  componentDidMount() {
    fetch(apiPath, {
      method: "GET",
      headers: {}
    })
      .then(response => response.json())
      .then(json => this.setState({ tasks: json, loading: false }))
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    if (this.state.loading) {
      return "Loading...";
    }
    return (
      <div className="App">
        <header className="App-header">Todoist</header>
        <div>
          <ul className="App-list">
            {this.state.tasks.map(t => (
              <li key={t.id}>
                <IconButton onClick={() => this.removeTask(t.id)}>
                  <CheckCircleOutline
                    className="App-ButtonDone"
                    fontSize="small"
                  />
                </IconButton>
                {t.name}
              </li>
            ))}

            <Input
              placeholder="Nowe zadanie..."
              value={this.state.newTask}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.addCurrentTask();
                }
              }}
              onChange={event => this.setState({ newTask: event.target.value })}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Add />}
              onClick={() => this.addCurrentTask()}
            >
              Dodaj
            </Button>
          </ul>
        </div>
      </div>
    );
  }

  removeTask(taskId) {
    let tasks = this.state.tasks;
    let newTaskList = tasks.filter(task => task.id !== taskId);
    this.setState({ tasks: newTaskList });

    fetch(apiPath + "/" + taskId, {
      method: "DELETE"
    })
      .then(response => console.log("successfully deleted", taskId))
      .catch(err => {
        console.log(err);
      });
  }

  addCurrentTask() {
    let newTasksList = this.state.tasks;
    let newTask = { id: uuidv1(), name: this.state.newTask };
    newTasksList.push(newTask);

    this.setState({
      tasks: newTasksList,
      newTask: ""
    });

    fetch(apiPath, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newTask)
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default App;
