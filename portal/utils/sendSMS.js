import axios from "axios";
import sendLog from "./sendLog";

const sendSMS = async (msg, templateId, contactNumber) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/sms`,
      data: {
        contactNumber: contactNumber,
        msg: msg,
        templateId: templateId,
      },
    });
    if (response.data?.error) {
      sendLog(
        `⚠️ *e-Samwad*\n :round_pushpin: \`${process.env.NEXT_PUBLIC_URL}\` \n :pager: SMS status update notification sending to *${contactNumber}* failed`
      );
      return { error: response.data?.error, success: null };
    } else if (response.data?.success) {
      sendLog(
        `:white_check_mark: *e-Samwad*\n :round_pushpin: \`${process.env.NEXT_PUBLIC_URL}\` \n :pager: SMS status update notification successfully sent to *${contactNumber}*`
      );
      return { success: response.data?.success, error: null };
    }
  } catch (err) {
    return err;
  }
};

export default sendSMS;
