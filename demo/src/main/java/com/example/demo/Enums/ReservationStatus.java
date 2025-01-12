package com.example.demo.Enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum ReservationStatus {
    Pending,
    Cancelled,
    Completed;

    @JsonCreator
    public static ReservationStatus fromString(String value) {
        return ReservationStatus.valueOf(value);
    }
}
