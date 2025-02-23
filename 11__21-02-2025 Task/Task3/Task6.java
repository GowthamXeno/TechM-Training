// 6. Write a Java program to determine the last modified date of a file.

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Task6 {
    public static void main(String[] args) {
        String path = "C:\\Users\\gowth\\OneDrive\\Desktop\\TechM-Training\\11__21-02-2025 Task\\Task3\\Task1.java";

        File file = new File(path);
        if (file.exists()) {

            long lastModified = file.lastModified();
            String DateandTime = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss").format(new Date(lastModified));
            System.out.println("The Last Modified date of file is " + DateandTime);
        }
    }
}
