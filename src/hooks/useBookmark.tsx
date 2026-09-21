import { useAppSelector, useAppDispatch } from "../store/hooks";
// import { selectBookmarkById } from "../store/selectors/bookmarkSelectors";
import { fetchBookmarks } from "../services/bookmarkServices";
import { bookmarkActions } from "../store/slices/bookmarkSlice";

import { useEffect } from "react";

export function useBookmark() {
    const dispatch = useAppDispatch();
    const bookmarks = useAppSelector((state) => state.bookmarks);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookmarks = await fetchBookmarks();
                if (bookmarks) {
                    dispatch(bookmarkActions.setBookmarks(bookmarks));
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchData();
    },[dispatch, bookmarks]);

}