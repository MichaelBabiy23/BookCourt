# BookCourt
#### Video Demo: https://www.youtube.com/watch?v=idoN4Izc9mw
#### Description:
On our website, you have the opportunity to create an account and log in to facilitate the reservation of a court within our local community. The user-friendly platform allows you to book courts for various sports at any preferred date and time, enabling you to enjoy outdoor activities with friends. For added convenience, the system maintains a comprehensive history of your past bookings, and you can effortlessly manage your current active reservations, either viewing them or canceling as needed.

Our contact page serves as a direct channel to communicate with administrators. If you're logged in, sending a message becomes even more seamless, requiring no additional personal information input. To enhance user experience and prevent incomplete submissions, the JavaScript function embedded in the form checks for missing information. If any details are omitted, a modal alert promptly notifies the user, ensuring a complete and accurate submission.

The registration and login pages feature forms with multiple input fields for personal information. Similar to the contact page, JavaScript functionalities are implemented. In the registration process, an additional layer of security is applied by ensuring that the password includes both a letter and a number. Post-submission, the system conducts database checks to verify the uniqueness of the username, phone number, and email, preventing duplication. Moreover, stringent measures are in place to filter out any potentially harmful information harmful to our backend.

The login page, on the other hand, validates the entered username and password against our database. Upon successful verification, a session is initiated, granting access to the user. Across all pages, a visually appealing layout is maintained with a background video and a navigation bar facilitating easy movement between different sections.

In the history page, users can review their past bookings and conveniently cancel any active reservations. The court page involves a user-centric approach, prompting individuals to select their preferred sport and court for reservation. Once the court is chosen, the availability can be checked, leading the user to the courtDateAndTime page.

In the courtDateAndTime page, users have the flexibility to choose a specific date and duration (1 or 2 hours). The system then dynamically displays all available time slots based on the information stored in our database, offering a seamless and tailored experience for court reservations.
