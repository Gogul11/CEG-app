import React, { FC, useState, useEffect } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-modern-datepicker";

interface DatePickerModalProps {
  open?: boolean;
  selectedDate?: string;
  onChangeStartDate?: (date: string) => void;
  onClose?: () => void;
}

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

const DatePickerModal: FC<DatePickerModalProps> = ({ open, selectedDate, onChangeStartDate, onClose }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);

  // Ensure state updates if the selectedDate prop changes
  useEffect(() => {
    setSelectedStartDate(selectedDate);
  }, [selectedDate]);

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[white] rounded-2xl p-6 items-center w-11/12 shadow-lg">
          <DatePicker
            mode="calendar"
            selected={selectedStartDate}
            onSelectedChange={(date) => {
              setSelectedStartDate(date);
              if (onChangeStartDate) onChangeStartDate(date);
            }}
            options={{
              backgroundColor: "white",
              textHeaderColor: "black",
              textDefaultColor: "black",
              selectedTextColor: "white",
              mainColor: "black",
              textSecondaryColor: "black",
              borderColor: "black",
            }}
          />
          <TouchableOpacity style={{ marginTop: 16 }} onPress={onClose}>
            <Text className="text-black text-lg font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;
