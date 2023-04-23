-- DropForeignKey
ALTER TABLE "meeting_comments" DROP CONSTRAINT "meeting_comments_meetingId_fkey";

-- AddForeignKey
ALTER TABLE "meeting_comments" ADD CONSTRAINT "meeting_comments_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
