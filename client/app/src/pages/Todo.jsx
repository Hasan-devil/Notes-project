import { Card, Button } from "react-bootstrap";
import "../todo.css";

export default function Todo() {
  return (
    <div className="todo-container">
      <div className="todo-header">
        <form>
          <input type="text" className="todo-input" />
          <Button variant="add">+</Button>
        </form>
      </div>
    </div>
  );
}
// function List(props) {
//     return (
//       <li>
//         <Card className="todo-card">
//           <Card.Body>
//             <Card.Text>
//               {props.description}
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </li>
//     )
// }
