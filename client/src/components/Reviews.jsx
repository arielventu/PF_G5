import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import {getReviews, getReviewsById, setReviews} from '../actions/actions';
import styles from "./Reviews.modules.css";
import swal from 'sweetalert';
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Form,
    Label,
    Input,
    FormGroup,
    FormText,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
    ModalFooter,
    TextArea,

  
} from "reactstrap";


const Reviews = () => {
    const [modal, setModal] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);
    const reviews = useSelector((state) => state.reviews);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        id: "",
        username: "",
        description: "",
        starsLevel: "",
        productId: "",
    });

    const showModalUpdate = (data) => { 
        setForm(data);
        setModalUpdate(true);
    };

    const closeModalUpdate = () => {
        setModalUpdate(false);
    };

    const showModalInsert = () => {
        setModalInsert(true);
    };

    const closeModalInsert = () => {
        setModalInsert(false);
    };




    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    // const toggle = () => setShowForm(!showForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setReviews(form));
        swal("Review added successfully", "", "success");
        setModalInsert(false);
        // toggle();
    };


    return (
        <div>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>Reviews</h1>
                </div>
                <div className={styles.button}>
                    <button className="btn btn-primary" onClick={showModalInsert}>Add Review</button>
                </div>
                <div className={styles.table}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">Stars Level</th>
                                <th scope="col">Product Id</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews?.map((review) => (
                                <tr key={review.id}>
                                    <th scope="row">{review.id}</th>
                                    <td>{review.description}</td>
                                    <td>{review.starsLevel}</td>
                                    <td>{review.productId}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => showModalUpdate(review)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => dispatch(getReviewsById(review.id))}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <Modal isOpen={modalUpdate} toggle={closeModalUpdate}>
                    <ModalHeader toggle={closeModalUpdate}>Update Review</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" placeholder="Description" value={form.description} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="starsLevel">Stars Level</Label>
                                <Input type="text" name="starsLevel" id="starsLevel" placeholder="Stars Level" value={form.starsLevel} onChange={handleChange} />   
                            </FormGroup>
                            <FormGroup>
                                <Label for="productId">Product Id</Label>
                                <Input type="text" name="productId" id="productId" placeholder="Product Id" value={form.productId} onChange={handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Update</Button>{' '}
                            <Button color="secondary" onClick={closeModalUpdate}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
            <div>
                <Modal isOpen={modalInsert} toggle={closeModalInsert}>
                    <ModalHeader toggle={closeModalInsert}>Add Review</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="description">Your name</Label>
                                <Input type="text" name="username" id="username" placeholder="Your Name" value={form.username} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" placeholder="Description" value={form.description} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="starsLevel">Stars Level</Label>
                                <div class="starsDiv">
                                    <form action="">
                                        <input class="star star-5" id="star-5-2" type="radio" name="star" />
                                        <label class="star star-5" for="star-5-2"></label>
                                        <input class="star star-4" id="star-4-2" type="radio" name="star" />
                                        <label class="star star-4" for="star-4-2"></label>
                                        <input class="star star-3" id="star-3-2" type="radio" name="star" />
                                        <label class="star star-3" for="star-3-2"></label>
                                        <input class="star star-2" id="star-2-2" type="radio" name="star" />
                                        <label class="star star-2" for="star-2-2"></label>
                                        <input class="star star-1" id="star-1-2" type="radio" name="star" />
                                        <label class="star star-1" for="star-1-2"></label>
                                    </form>
                                </div>
                            </FormGroup>
                            <Button type="submit" color="primary">Add</Button>{' '}
                            <Button color="secondary" onClick={closeModalInsert}>Cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    );
};


    
    

//     return (
//         <div>
//             <button className={styles.button} onClick={toggle}>
//                 Add Review
//             </button>
//             <div>
//                 {showForm && (
//                     <div className={styles.modal}>
//                         <div className={styles.modalContent}>
//                             <form onSubmit={handleSubmit}>
//                                 <label>
//                                     <input
//                                         type="text"
//                                         name="id"
//                                         value={newReviewState.id}
//                                         onChange={handleChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="text"
//                                         name="starsLevel"
//                                         value={newReviewState.starsLevel}
//                                         onChange={handleChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="text"
//                                         name="description"
//                                         value={newReviewState.description}
//                                         onChange={handleChange}
//                                     />
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="text"
//                                         name="revpodusctId"
//                                         value={newReviewState.revpodusctId}
//                                         onChange={handleChange}
//                                     />
//                                 </label>
//                                 <button type="submit">Submit</button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div>
//                 {reviews.map((review) => (
//                     <div key={review.id}>
//                         <p>{review.id}</p>
//                         <p>{review.description}</p>
//                         <p>{review.starsLevel}</p>
//                         <p>{review.revpodusctId}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//    <div>
//        <div class="cont">
//          <div class="stars">
//            <form action="">
//              <input class="star star-5" id="star-5-2" type="radio" name="star" />
//              <label class="star star-5" for="star-5-2"></label>
//              <input class="star star-4" id="star-4-2" type="radio" name="star" />
//              <label class="star star-4" for="star-4-2"></label>
//              <input class="star star-3" id="star-3-2" type="radio" name="star" />
//              <label class="star star-3" for="star-3-2"></label>
//              <input class="star star-2" id="star-2-2" type="radio" name="star" />
//              <label class="star star-2" for="star-2-2"></label>
//              <input class="star star-1" id="star-1-2" type="radio" name="star" />
//              <label class="star star-1" for="star-1-2"></label>
//              <div class="rev-box">
//                <textarea class="review" col="30" name="review"></textarea>
//                <label class="review" for="review">
//                  Breif Review
//                </label>
//                            <button class="submit" type="submit">Submit</button>
//              </div>
//            </form>
//          </div>
//        </div> 

//         <form>
//             <div className={styles.revBox}>
//                 <textarea className={styles.textAreaReview} col="30" name="review"></textarea>
//                 <label className={styles.labelReview} for="review">Breif Review</label>
//             </div>
//         </form> 
//     </div>
//    );
// };

export default Reviews;
