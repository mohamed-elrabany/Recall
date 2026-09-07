import Section from "../ui/Section";
import Row from "../ui/Row";

import { RiDeleteBin6Line } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";

export default function DangerZone() {
  return (
    <Section title="Danger Zone">
      <Row label="Sign out" description="Sign out of your account on this device">
        <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-semibold transition-colors duration-150 ease-in-out cursor-pointer">
          <PiSignOutBold />
          Sign Out
        </button>
      </Row>
      <Row danger={true} label="Delete your account" description="This will permanently delete your account and all associated data">
        <button className="text-red-500 flex items-center gap-2 text-sm font-semibold hover:text-red-600  transition-colors duration-150 ease-in-out cursor-pointer">
          <RiDeleteBin6Line />
          Delete
        </button>
      </Row>
    </Section>
  );
}