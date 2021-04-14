declare namespace DEVICE {
  type deviceLogs = {
    time: string;
    alarmType: string;
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
    second: number;
    rh: number;
    voc1: number;
    voc2: number;
    alarmType: number;
    number: number;
    clear: number;
    threshold: number;
    t: number;
  };
  type bindDevice = {
    code: string;
  };
}
