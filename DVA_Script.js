// ==UserScript==
// @name         DVA_Script
// @namespace    http://tampermonkey.net/
// @version      2026-10-12
// @description  Quickly find a new driving test appointment!
// @author       Immutable
// @match        https://dva-bookings.nidirect.gov.uk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nidirect.gov.uk
// @grant        none
// ==/UserScript==

/*

 This script helps users to find a driving test appointment on the DVA website.
 Most people are trying to find cancellations which requires checking the DVA website several times a day.
 This script can instantly fill in your details then automatically show the list of available
 appointments in red, saving time and providing potential appointments at a glance.

 To use the script, simply edit the values below, save the script then head to the DVA website.
 If you don't yet have a test booked, head to https://dva-bookings.nidirect.gov.uk/BookDriver/Driver/DriverSearch
 Otherwise head to https://dva-bookings.nidirect.gov.uk/MyBookings/FindDriver
*/

//// EDIT THESE VALUES ////
var BookingReferenceNumber = ''; //Leave this blank if you don't have one yet
var DriverNumber = '';
var DateOfBirth = ''; // The format is YYYY-MM-DD such as 1990-09-30
//// EDIT THESE VALUES ////

(function ($) {
    'use strict';

    $(function () {
        const path = window.location.pathname;

        if (path === '/MyBookings/FindDriver') {
            handleFindDriver();
        } else if (path === '/MyBookings/FindDriver/MyAppointments') {
            handleMyAppt();
        } else if (path === '/BookDriver/Driver/DriverSearch') {
            handleDriverSearch();
        } else if (path === '/BookDriver/DrivingTest/SelectTest') {
            handleSelectTest();
        } else if (path === '/BookDriver/Disability/SpecialRequirements') {
            handleSpecialReq();
        } else if (path === '/BookDriver/DriverAppointment/SelectAppointment') {
            handleSelectAppt();
        }

    });

    function handleFindDriver() {
        if (BookingReferenceNumber != '') {
            // Booking reference
            $('#BookingReference').val(BookingReferenceNumber);

            handleDriverSearch(); //shared code
        }
    }

    function handleDriverSearch() {
        if (DriverNumber != '' && DateOfBirth != '') {
            // Driver Number
            $('#DriverNo').val(DriverNumber);

            // Date of birth
            $('#dob').val(DateOfBirth)

            // Click Next button
            $('button[type="submit"]').trigger('click');
        }
    }

    function handleMyAppt() {
        // Click Change Appointment button
        $('#btnChange').trigger('click');
    }

    function handleSelectTest() {
        // Select Motorcar
        $('#SelectedTest').val('4').trigger('change');

        // Click Next button
        $('button[type="submit"]').trigger('click');
    }

    function handleSpecialReq() {
        // Select no disability
        $('#specialRequirementsRadioNo').prop('checked', true).trigger('change');

        // Click Next button
        $('button[type="submit"]').trigger('click');
    }

    function handleSelectAppt() {

        //Click the dropdown list
        $('button[data-id="ddlTestCentres"]').trigger('click');

        //Change the colour of available test centres to red
        $('.dropdown-menu .dropdown-item.available').css('color', 'red');

        setTimeout(() => {
        }, 1000);

    }
})(jQuery);