import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">About Mindlog</h2>
          <p>
            This is a side project created by James Botwina and Louis Zhao to
            explore how SMS text messages can be used to remind users to write
            micro-journal entries directly from thier phone's messaging
            applicaiton. You can also add journal entries on the the
            applicaiton's home page.
          </p>
          <strong>How to Use the App</strong>
          <ul>
            <li>
              Go to the profile page to schedule a maximum of 3 SMS reminders
            </li>
            <li>A SMS message will be sent to you during that minute</li>
            <li>
              You can reply to that message. Your entry will be stored in the
              database and will appear in the Previous Messages Tab and the Home
              Tab.
            </li>
            <li>
              Within the Previous Messages Tab, you can click on a day and you
              will be taken to a page that has all the reflections from that
              day!
            </li>
            <li>
              You can delete your account and all information on the Profile
              Page.
            </li>
            <li>Use the Profile Page to change profile information.</li>
          </ul>
          <strong>Contact the Developers at</strong>
          <ul>
            <li>James Botwina: jamesbot@seas.upenn.edu</li>
            <li>Louis Zhao: qiz216@seas.upenn.edu</li>
          </ul>
        </div>
      </div>
    );
  }
}
