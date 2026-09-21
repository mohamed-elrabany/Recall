import { useParams } from "react-router";
import { useAppSelector } from "../store/hooks";
import { selectBookmarkById } from "../store/selectors/bookmarkSelectors";
import EditBookmarkForm from "../components/bookmarks/EditBookmarkForm";


export function Component() {
  const { bookmarkId } = useParams<{ bookmarkId: string }>();
  const bookmark = useAppSelector((state) =>
    bookmarkId ? selectBookmarkById(state, bookmarkId) : undefined,
  );

  if (!bookmark) return null;

  return <EditBookmarkForm bookmark={bookmark} key={bookmark?.id} />;
}
