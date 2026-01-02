import { customAlphabet, nanoid } from "nanoid";
import { ROOM_ID } from "./constants";

const generate = customAlphabet(ROOM_ID.ALPHABET, ROOM_ID.SIZE);

export const generateRoomId = () => generate();
export const generateGuestId = () => nanoid(10);
export const generateGuestUsername = () => `Guest_${nanoid(6)}`;
