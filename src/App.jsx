import './App.css';
import Collapse from './Collapse';
import {useState, useEffect, useRef} from 'react';

const App = () => {

  useEffect(() => {
      runInitialChecks();
  }, []);

  const inputRefs = useRef([]);
  const todoRefs = useRef([]);
  const alertRefs = useRef([]);

  const [workTodos, setWorkTodos] = useState([
    {
      title: 'Example Work Todo 1',
      content: 'Sample Content',
      type: 'work',
      dueDate: '2024-09-20',
      done: false,
      sample: true
    },
  ]);
  const [playTodos, setPlayTodos] = useState([
    {
      title: 'Example Play Todo 1',
      content: 'Sample Content',
      type: 'play',
      dueDate: '2024-09-23',
      done: false,
      sample: true
    },
    {
      title: 'Example Play Todo 2',
      content: 'Sample Content',
      type: 'play',
      dueDate: '2024-09-24',
      done: false,
      sample: true
    },
    {
      title: 'Example Play Todo 3',
      content: 'Sample Content',
      type: 'play',
      dueDate: '2024-09-25',
      done: true,
      sample: true
    },
    {
      title: 'Example Play Todo 4',
      content: 'Sample Content',
      type: 'play',
      dueDate: '2024-09-26',
      done: false,
      sample: true
    },
  ]);

  useEffect(() => {
    calcStats();
  }, [workTodos, playTodos]);

  const [workDones, setWorkDones] = useState(0);
  const [workUndones, setWorkUndones] = useState(0);
  const [playDones, setPlayDones] = useState(0);
  const [playUndones, setPlayUndones] = useState(0);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [type, setType] = useState('');

  const [dragged, setDragged] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const check = (id, type) => {
    if (type === 'work')
    {
      let newTodos = workTodos.map((item, index) => {
        if (index === id) 
        {
          if (item.done)
          {
            item.done = false;
          }
          else
          {
            item.done = true;
          }

          return item;
        } 
        else 
        {
          return item;
        }
      });

      setWorkTodos(newTodos);
    }
    else
    {
      let newTodos = playTodos.map((item, index) => {
        if (index === id) 
        {
          if (item.done)
          {
            item.done = false;
          }
          else
          {
            item.done = true;
          }

          return item;
        } 
        else 
        {
          return item;
        }
      });

      setPlayTodos(newTodos);
    }
  };
  const update = (id, type, content, dueDate) => {
    if (type === 'work')
    {
      let newTodos = workTodos.map((item, index) => {
        if (index === id) 
        {
          item.content = content;
          item.dueDate = dueDate;

          return item;
        } 
        else 
        {
          return item;
        }
      });

      setWorkTodos(newTodos);
    }
    else
    {
      let newTodos = playTodos.map((item, index) => {
        if (index === id) 
        {
          item.content = content;
          item.dueDate = dueDate;

          return item;
        } 
        else 
        {
          return item;
        }
      });

      setPlayTodos(newTodos);
    }
  };
  const remove = (id, type) => {
    if (type === 'work')
    {
      setWorkTodos(
        workTodos.filter((item, index) =>
          index !== id
        )
      );
    }
    else
    {
      setPlayTodos(
        playTodos.filter((item, index) =>
          index !== id
        )
      );
    }
  };

  const handleDrop = (targetItem, type) => {
    if (!dragged) return;

    if (type === 'work')
    {
      let currentIndex = workTodos.indexOf(dragged);
      let targetIndex = workTodos.indexOf(targetItem);

      if (currentIndex !== -1 && targetIndex !== -1) 
      {
        let newTodos = [...workTodos];
        newTodos.splice(currentIndex, 1);
        newTodos.splice(targetIndex, 0, dragged);
        setWorkTodos(newTodos);
      }
    }
    else
    {
      let currentIndex = playTodos.indexOf(dragged);
      let targetIndex = playTodos.indexOf(targetItem);

      if (currentIndex !== -1 && targetIndex !== -1) 
      {
        let newTodos = [...playTodos];
        newTodos.splice(currentIndex, 1);
        newTodos.splice(targetIndex, 0, dragged);
        setPlayTodos(newTodos);
      }
    }
  };

  const warnRequired = (input) => {
    input.classList.add("warn-required");
    setTimeout(function() {
      input.classList.remove("warn-required");
    }, 2000);
  };
  const addNewItem = () => {
    if (!type)
    {
      warnRequired(inputRefs.current['type']);
      return;
    };

    if (!dueDate) 
    {
      warnRequired(inputRefs.current['date']);
      return;
    };

    if (!title) 
    {
      warnRequired(inputRefs.current['title']);
      return;
    };

    if (!content) 
    {
      warnRequired(inputRefs.current['content']);
      return;
    };

    let todo = {
      title: title,
      content: content,
      dueDate: dueDate,
      type: type,
      done: false,
      sample: false
    };

    if (type === 'work')
    {
      setWorkTodos(prevWorkTodos => [...prevWorkTodos, todo]);
    }
    else
    {
      setPlayTodos(prevPlayTodos => [...prevPlayTodos, todo]);
    }

    setTitle('');
    setContent('');
    setDueDate('');
    setType('');
  };

  const [alerts, setAlerts] = useState([]);
  const closeAlert = (e) => {
    e.target.parentElement.remove();
  };
  const runInitialChecks = () => {
    workTodos.map((todo, i) => {
      if (!todo.done && isToday(new Date(todo.dueDate)))
      {
        todo.index = i;
        setAlerts(prevAlerts => [...prevAlerts, todo]);
      }
    });
    playTodos.map((todo, i) => {
      if (!todo.done && isToday(new Date(todo.dueDate)))
      {
        todo.index = i;
        setAlerts(prevAlerts => [...prevAlerts, todo]);
      }
    });

    calcStats();
  };
  const calcStats = () => {
    let workDoneCount = workTodos.filter(todo => todo.done).length;
    let workUndoneCount = workTodos.length - workDoneCount;
    setWorkDones(workDoneCount);
    setWorkUndones(workUndoneCount);

    let playDoneCount = playTodos.filter(todo => todo.done).length;
    let playUndoneCount = playTodos.length - playDoneCount;
    setPlayDones(playDoneCount);
    setPlayUndones(playUndoneCount);
  }
  const isToday = (someDate) => {
    const today = new Date();

    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear();
  }
  const scrollToTodo = (type, index) => {
    focusOnTodo(todoRefs.current[`${type}-${index}`]);

    let clickedAlert = alertRefs.current[`${type}-${index}`];
    clickedAlert.remove();
  }
  const focusOnTodo = (highlightedTodo) => {
    highlightedTodo?.scrollIntoView({behavior:'smooth'}); 
    highlightedTodo.classList.add("highlighted");
    if (highlightedTodo.querySelector(".Collapsible__trigger").classList.contains("is-closed"))
    {
      highlightedTodo.querySelector(".Collapsible__trigger").click();
    }
    setTimeout(function() {
      highlightedTodo.classList.remove("highlighted");
    }, 2000);
  };

  return (
    <>
      <div id="overlay">
        {alerts.map((alert, index) => (
          <p 
            className="alert" 
            key={index} 
            ref={el => { alertRefs.current[`${alert.type}-${alert.index}`] = el; }}
          >
            <button className="non-button" onClick={() => {scrollToTodo(alert.type, alert.index)}}>{alert.title}</button> 
            is due today!
            <span className="fa-xmark" onClick={(e) => closeAlert(e)}></span>
          </p>
        ))}
      </div>
      <h1>Todo List</h1>
      <div className="form-wrapper">
        <div className="form">
          <select 
            className="input-field"
            value={type}
            onChange={handleTypeChange}
            ref={el => { inputRefs.current['type'] = el; }}
          >
            <option value="" disabled hidden>Type (Required)</option>
            <option value="work">Work</option>
            <option value="play">Play</option>
          </select>
          <input
            placeholder="Due Date (Required)"
            onFocus={(e) => e.currentTarget.type = "date"} 
            onBlur={(e) => e.currentTarget.type = "text"} 
            className="input-field"
            value={dueDate}
            onChange={handleDueDateChange}
            ref={el => { inputRefs.current['date'] = el; }}
          />
          <input
            type="text"
            placeholder="Title (Required)"
            className="input-field"
            value={title}
            onChange={handleTitleChange}
            ref={el => { inputRefs.current['title'] = el; }}
          />
          <input
            type="text"
            placeholder="Content (Required)"
            className="input-field"
            value={content}
            onChange={handleContentChange}
            ref={el => { inputRefs.current['content'] = el; }}
          />
          <button onClick={addNewItem} className="add-button">
            Add New
          </button>
        </div>
      </div>
      <div className="todolists">
        <div className="todolist-wrapper">
          <h2>Work</h2>
          <p className="stats">
            <span className="task-done">{workDones}</span>    
            <span className="task-undone">{workUndones}</span>
          </p>
          <div className="todolist">
            {workTodos.map((item, index) => (
              <div 
                key={index}
                ref={el => { todoRefs.current[`work-${index}`] = el; }}
                className={`status ${item.done ? "done" : "ongoing"}`}
                draggable="true"
                onDragStart={() => setDragged(item)}
                onDragEnd={() => setDragged(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item, 'work')}
              >
                <Collapse index={index} item={item} check={check} update={update} remove={remove} />
              </div>
            ))}
          </div>
        </div>
        <div className="todolist-wrapper">
          <h2>Play</h2>
          <p className="stats">
            <span className="task-done">{playDones}</span>    
            <span className="task-undone">{playUndones}</span>
          </p>
          <div className="todolist">
            {playTodos.map((item, index) => (
              <div 
                key={index}
                ref={el => { todoRefs.current[`play-${index}`] = el; }}
                className={`status ${item.done ? "done" : "ongoing"}`}
                draggable="true"
                onDragStart={() => setDragged(item)}
                onDragEnd={() => setDragged(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(item, 'play')}
              >
                <Collapse index={index} item={item} check={check} update={update} remove={remove} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;