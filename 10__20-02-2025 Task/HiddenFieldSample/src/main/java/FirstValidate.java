import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/FirstValidate")
public class FirstValidate extends HttpServlet {

	  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        response.setContentType("text/html;charset=UTF-8");
	        PrintWriter out = response.getWriter();     
		
	        String user = request.getParameter("user");
	        out.println("<form action='SecondValidate'>");
	        out.println("<input type='hidden' name='user' value='"+user+"'>");
	        out.println("<input type='submit' value='submit' >");
	        out.println("</form>");
  
	        }}