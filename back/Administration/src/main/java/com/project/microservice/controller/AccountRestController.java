package com.project.microservice.controller;

import java.io.File;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.webjars.NotFoundException;

import com.google.gson.Gson;
import com.project.microservice.entity.ChatRequest;
import com.project.microservice.entity.ChatResponse;
import com.project.microservice.entity.Fonction;
import com.project.microservice.entity.Permission;
import com.project.microservice.entity.Utilisateur;
import com.project.microservice.filter.JwtAuthenticationFilter;
import com.project.microservice.repository.UtilisateurRepository;

import com.project.microservice.service.UtilisateurService;

import lombok.Data;


@RestController
public class AccountRestController {
	
	@Autowired  
	UtilisateurService UtilisateurServImp;
	@Autowired
	UtilisateurRepository UtilisateurRepository;

    private final UtilisateurService utilisateurServImp;

    public AccountRestController(UtilisateurService utilisateurServImp) {
        this.utilisateurServImp = utilisateurServImp;
    }
	//Utilisateur crud
		@GetMapping("retrieve-all-Utilisateur")
		@ResponseBody
		public List<Utilisateur> getAllUtilisateurs(){
			return this.UtilisateurServImp.retrieveAllUtilisateurs();
		}
	    @GetMapping("/retrieveByUsername/{username}")
	    @ResponseBody
	    Optional<Utilisateur> getUtilisateurByUsername(@PathVariable String username) {
	    	return Optional.ofNullable(this.UtilisateurServImp.loadUserByUserName(username)); 
	    }
		@GetMapping("/retrieve-Utilisateur/{id}")  
		@ResponseBody
		private Optional<Utilisateur> getUtilisateur(@PathVariable("id") int id)   
		{  
			return Optional.ofNullable(this.UtilisateurServImp.retrieveUtilisateur(id)); 
		}
		
		@DeleteMapping("/remove-Utilisateur/{id}")  
		@ResponseBody
		private void deleteUtilisateur(@PathVariable("id") int id)   
		{  
			this.UtilisateurServImp.deleteUtilisateur(id);
		}
		
		
		 /*
		 
		  @PostMapping("/register")
		    public Utilisateur register(
		            @RequestParam("utilisateur") String ev,
		            @RequestParam("image")MultipartFile file
		    ) throws IOException {
			  Utilisateur user = new Gson().fromJson(ev, Utilisateur.class);


		        String image=file.getOriginalFilename();
		        String path="C://wamp/www/img";

		        byte[] bytes = image.getBytes();
		        int image2=bytes.toString().hashCode();
		        Files.copy(file.getInputStream(), Paths.get(path+ File.separator+image2+".jpg"));

		        user.setImage(""+image2);


		        return UtilisateurServImp.saveUtilisateur(user);
		    }

*/
		
		@PostMapping("/register")
		@ResponseBody
		public ResponseEntity<Utilisateur> register(@RequestBody Utilisateur user) {
		    user.setDate_creation(Date.from(LocalDate.now().atStartOfDay().atZone(ZoneId.systemDefault()).toInstant()));

		    Utilisateur savedUser = UtilisateurServImp.saveUtilisateur(user);
		    return ResponseEntity.ok(savedUser);
		}

		
		   @GetMapping("/activate")
		   public void updateStatut(@RequestParam("userId") int userId,@RequestParam("expirationTime") String  expirationTime) {
		       UtilisateurServImp.ActivateCompte(userId,expirationTime);
		   }


		    @PutMapping("/modify-Utilisateur/{id}")
		    public Utilisateur updateUtilisateur(@RequestBody Utilisateur user, @PathVariable int id) {
		        return UtilisateurServImp.updateUtilisateur(id, user);
		    }

		    
		    @PutMapping("/modify-User")
		    public Utilisateur updateUser(@RequestParam("utilisateur") String ev, @RequestParam("image") MultipartFile file) throws IOException {
		        Utilisateur user = new Gson().fromJson(ev, Utilisateur.class);
		        return UtilisateurServImp.updateUser(user, file);
		    }

		    @GetMapping("/images/{fileName:.+}")
		    public ResponseEntity<Resource> getImage(@PathVariable String fileName) throws IOException {
		        // Construire le chemin complet du fichier
		        String uploadDir = "C://Users//HP//Desktop//front//src//assets//assets//uploads";
		        String filePath = uploadDir + File.separator + fileName;

		        // Charger le fichier en tant que ressource
		        Resource resource = new UrlResource("file:" + filePath);

		        // Vérifier si le fichier existe
		        if (resource.exists()) {
		            return ResponseEntity.ok()
		                    .contentType(MediaType.IMAGE_JPEG) // ou le type MIME correspondant à votre type d'image
		                    .body(resource);
		        } else {
		            return ResponseEntity.notFound().build();
		        }
		    }
		    @PostMapping("/affectProfilToUser")
		    public void affectProfilToUser(@RequestBody AffectForme affectForm){
		    	UtilisateurServImp.affecterProfilToUser(affectForm.getId(),affectForm.getProfil_id());
		    }
		    
		    @PostMapping("/chat")
		    @ResponseBody
		    public ResponseEntity<ChatResponse> processMessage(@RequestBody ChatRequest chatRequest) {
		        String message = chatRequest.getMessage();
		        String answer = utilisateurServImp.processMessage(message);

		        ChatResponse chatResponse = new ChatResponse();
		        chatResponse.setAnswer(answer);

		        if (answer != null) {
		            return ResponseEntity.ok(chatResponse);
		        } else {
		            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		        }
		    }
		    
		    @PostMapping("/forgot-password")
		    public ResponseEntity<String> requestPasswordReset(@RequestParam("email") String email) {
		        return UtilisateurServImp.requestPasswordReset(email);
		    }
		    
			
		    @GetMapping("/reset_password")
		    public ModelAndView showResetPasswordForm(@RequestParam(value = "email") String email) {
		        Utilisateur customer = UtilisateurRepository.findByEmail(email);
		        ModelAndView modelAndView = new ModelAndView("reset_password_form");
		        if (customer == null) {
			          
		            return new ModelAndView("message");
		        }

		        modelAndView.addObject("email", email);
		        System.out.println("Customer: " + customer); // Vérifiez la valeur de customer
		        System.out.println("Customer: " + email); // Vérifiez la valeur de customer

		        return modelAndView;
		       
		    
		    }

		    
		    @PostMapping("/reset_password")
		    public ModelAndView processResetPassword(HttpServletRequest request) {
		        String email = request.getParameter("email");
		        String password = request.getParameter("password");
		        
		        Utilisateur customer = UtilisateurRepository.findByEmail(email);
		        
		        ModelAndView modelAndView = new ModelAndView();
		        modelAndView.addObject("title", "Reset your password");
		        
		        if (customer == null) {
		        	 return new ModelAndView("message");
		        } else {           
		            utilisateurServImp.updatePassword(customer, password);
		            modelAndView.setViewName("pass_modifié");
		            modelAndView.addObject("message", "You have successfully changed your password.");
		        }
		        
		        return modelAndView;
		    }
		    
		    
	
		 
		
}

class AffectForme{
    private int id;
    private int profil_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getProfil_id() {
		return profil_id;
	}
	public void setProfil_id(int profil_id) {
		this.profil_id = profil_id;
	}
	public AffectForme(int id, int profil_id) {
		super();
		this.id = id;
		this.profil_id = profil_id;
	}
	public AffectForme() {
		super();
		// TODO Auto-generated constructor stub
	}
	
    
}
