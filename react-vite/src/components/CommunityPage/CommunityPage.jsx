import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./CommunityPage.css";
import { getCommunityById } from "../../redux/community";

function CommunityPage() {
  const { communityId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommunityById(communityId));
  }, [dispatch, communityId]);
  return <h1>Sup Dude</h1>;
}

export default CommunityPage;
