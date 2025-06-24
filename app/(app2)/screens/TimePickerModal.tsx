import React, { FC, useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-modern-datepicker";

interface TimePickerModalProps {
  open?: boolean;
  selectedTime?: string;
  onChangeTime?: (time: string) => void;
  onClose?: () => void;
}

const TimePickerModal: FC<TimePickerModalProps> = ({ open, selectedTime, onChangeTime, onClose }) => {
  const [selected, setSelected] = useState(selectedTime);

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[white] rounded-2xl p-6 items-center w-11/12 shadow-lg">
          <DatePicker
            mode="time" // Time mode instead of calendar
            selected={selected}
            onTimeChange={(time) => {
              setSelected(time);
              if (onChangeTime) onChangeTime(time);
            }}
            options={{
              backgroundColor: "white",
              textHeaderColor: "black",
              textDefaultColor: "black",
              selectedTextColor: "white",
              mainColor: "black",
              textSecondaryColor: "black",
              borderColor: "#8690FF",
            }}
          />
          <TouchableOpacity className="mt-4" onPress={onClose}>
            <Text className="text-black text-lg font-semibold">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;
