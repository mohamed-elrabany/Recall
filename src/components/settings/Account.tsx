import Section from "../ui/Section";
import Row from "../ui/Row";
import type { Profile } from "../../types/profile";

import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCameraAlt } from "react-icons/md";

export default function Account({ user = null }: { user: Profile | null }) {
  const initials =
    user?.full_name
      ?.split(" ")
      .slice(0, 2)
      .map((name) => name.charAt(0).toUpperCase())
      .join("") || "N/A";


  return (
    <Section title="Account">
      {/* Avatar */}
      <div className="flex items-center gap-4 px-5 py-5 border-b border-border">
        <div className="relative">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-extrabold text-primary"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {initials}
            </div>
          )}
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <MdOutlineCameraAlt size={11} className="text-white" />
          </button>
        </div>
        <div>
          <p
            className="text-base font-bold text-foreground"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {user?.full_name || "Mohamed Loay"}
          </p>
          <p className="text-sm text-muted-foreground">
            {user?.email || "lolo@outlook.com"}
          </p>
          <p className="text-xs text-secondary mt-0.5 font-medium">312 saves</p>
        </div>
      </div>
      <Row label="Full name">
        <p className="text-sm text-foreground">
          {user?.full_name || "Mohamed Loay"}
        </p>
      </Row>
      <Row label="Email address">
        <p className="text-sm text-foreground">
          {user?.email || "lolo@outlook.com"}
        </p>
      </Row>
      <Row label="Change password">
        <button className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline transition-all duration-150 ease-in-out cursor-pointer">
          Update password
          <IoIosArrowForward />
        </button>
      </Row>
    </Section>
  );
}
