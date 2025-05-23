import axios from "axios";
const token = localStorage.getItem("jwtToken")
const REVIEW_API_BASE_URL = "http://localhost:8080/api/reviews";
class ReviewService{
    postReview=(review)=>{
        let response = axios.post(REVIEW_API_BASE_URL,review,{
            headers : {
                Authorization : `Bearer ${token}`,
            },
        });
        return response;
    }

}
export default new ReviewService();