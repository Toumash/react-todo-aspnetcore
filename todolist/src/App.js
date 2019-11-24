import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Add from "@material-ui/icons/AddCircle";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";

class App extends React.Component {
  constructor(props) {
    super(props);
    let savedState = null;
    if (localStorage.getItem("data") != null) {
      savedState = JSON.parse(localStorage.getItem("data"));
    }
    this.state = savedState || {
      newTask: "",
      tasks: []
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Todoist</header>
        <div>
          <ul className="App-list">
            {this.state.tasks.map(t => (
              <li key={t}>
                <IconButton onClick={event => this.removeTask(t)}>
                  <CheckCircleOutline
                    className="App-ButtonDone"
                    fontSize="small"
                  />
                </IconButton>
                {t}
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
  removeTask(t) {
    let tasks = this.state.tasks;
    let newTaskList = tasks.filter(task => task !== t);
    this.setState({ tasks: newTaskList }, () => {
      localStorage.setItem("data", JSON.stringify(this.state));
    });
  }
  addCurrentTask() {
    let newTasksList = this.state.tasks;
    newTasksList.push(this.state.newTask);

    this.setState(
      {
        tasks: newTasksList,
        newTask: ""
      },
      () => {
        localStorage.setItem("data", JSON.stringify(this.state));
      }
    );
  }
}

export default App;
