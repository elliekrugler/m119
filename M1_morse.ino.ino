/* 
DAH = 3 x DIT
DIT/DAH SPACE = 1 x DIT
LETTER SPACE = 3 x DIT
WORD SPACE = 7 x DIT

HELLO IMU = 
.... / . / .-.. / .-.. / - - - // .. / — / ..-
HLHLHLHLLLHLLLHLHHHLHLHLLLHHHLHHHLHHHLLLLLLLHLHLLLHHHLHHHLLLHLHLHHHL
*/

const int DIT_DUR = 500;

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  delay(50);
}

void loop() {
  // put your main code here, to run repeatedly:
  letter("....");
  letter(".");
  letter(".-..");
  letter(".-..");
  letter("---");
  space(4);
  letter("..");
  letter("--");
  letter("..-");
  space(4);
}

void letter(String l){
  for(int i = 0; i < l.length(); i++){
    digitalWrite(LED_BUILTIN, HIGH);
    if(l[i] == '.'){
      delay(DIT_DUR);
    }
    else if(l[i] == '-'){
      delay(DIT_DUR*3);
    }
    digitalWrite(LED_BUILTIN, LOW);
    delay(DIT_DUR);    
  }
  delay(DIT_DUR*2);
}

  void space(int num_spaces) {
    digitalWrite(LED_BUILTIN, LOW);
    delay(DIT_DUR*num_spaces);
  }