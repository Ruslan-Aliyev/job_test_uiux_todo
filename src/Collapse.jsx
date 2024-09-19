import Collapsible from 'react-collapsible';
import {useState, useEffect, useRef} from 'react';

const Collapse = ({index, item, check, update, remove}) => {

  const [content, setContent] = useState(item.content);
  const [dueDate, setDueDate] = useState(item.dueDate);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({behavior:"smooth"});
      ref.current.parentElement.classList.add("highlighted");
      setTimeout(function() {
        ref.current.parentElement.classList.remove("highlighted");
      }, 2000);
    }
  }, []);

  return (
    <div ref={!item.sample ? ref : null}>
      <Collapsible trigger={item.title}>
        <div className="item-form">
          <input
            className="input-field"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={item.done ? true : false}
          />
          <input
            type="date"
            className="input-field"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            disabled={item.done ? true : false}
          />
        </div>
        <div className="actions">
          <button onClick={() => check(index, item.type)} className="fa-circle-check tooltip"><span className="tooltiptext">Mark as done</span></button>
          <button onClick={() => update(index, item.type, content, dueDate)} className="fa-pen tooltip"><span className="tooltiptext">Update</span></button>
          <button onClick={() => remove(index, item.type)} className="fa-trash tooltip"><span className="tooltiptext">Delete</span></button>
        </div>
      </Collapsible>
    </div>
  );
};

export default Collapse;