-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "eventEventId" INTEGER;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eventEventId_fkey" FOREIGN KEY ("eventEventId") REFERENCES "Event"("eventId") ON DELETE SET NULL ON UPDATE CASCADE;
