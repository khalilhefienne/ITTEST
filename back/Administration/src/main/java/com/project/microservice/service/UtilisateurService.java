package com.project.microservice.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.project.microservice.entity.Permission;
import com.project.microservice.entity.Profil;
import com.project.microservice.entity.Utilisateur;

import com.project.microservice.repository.ProfilRepository;
import com.project.microservice.repository.UtilisateurRepository;

import net.bytebuddy.utility.RandomString;


@Service
public class UtilisateurService implements UtilisateurServiceI {
	
	@Autowired
	UtilisateurRepository UtilisateurRepository;
	
	 @Autowired
	    private ProfilRepository profilRepository;
	 //on ajoute au constructeur ou on ajoute  @Autowired
	 @Autowired
	   private BCryptPasswordEncoder  passwordEncoder;
	 @Autowired
	 private  EmailValidator emailValidator;

	 @Autowired
	 private  EmailSender emailSender;
		
//------------------------------------------------------------
		@Override
		   public Utilisateur saveUtilisateur(Utilisateur user) {

		      //encoder le mot de passe 
		       String pw = user.getPassword();
		       user.setPassword(passwordEncoder.encode(pw));
		       
		       //verification si mail valide ou pas
		       boolean isValidEmail = emailValidator.
		               test(user.getEmail());
		       
		// email exixt ou nn 
		       
		   	boolean emailExists = UtilisateurRepository.findByEmail(user.getEmail()) != null;
		// username exixte u nn 
		   	boolean usernameExists = UtilisateurRepository.findByUsername(user.getUsername()) != null;

		   	if (emailExists || !isValidEmail || usernameExists) {
		   		if (emailExists) {
		   		throw new IllegalStateException("email already taken");
		   		} else if (!isValidEmail) {
		   		throw new IllegalStateException("email not valid");
		   		} else {
		   		throw new IllegalStateException("username already taken");
		   		}
		   		}
			else {
				   // Récupérer le profil avec l'id égal à 1
				// Récupérer le profil avec l'id égal à 1
				Profil profil = profilRepository.findById(1).orElseThrow(() -> new IllegalStateException("Profile not found"));
// initialser nonactif  
				user.setStatut(false);
		        // Affecter le profil à l'utilisateur
		        user.setProfil(profil);
		
		        Utilisateur userSave = UtilisateurRepository.save(user);
		        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(15);
		        String formattedExpirationTime = expirationTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);

		        String link = "http://localhost:8082/activate?userId=" + userSave.getId() + "&expirationTime=" + formattedExpirationTime;
		     String content = "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
						"\n" +
						"<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
						"\n" +
						"  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
						"    <tbody><tr>\n" +
						"      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
						"        \n" +
						"        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
						"          <tbody><tr>\n" +
						"            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
						"                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
						"                  <tbody><tr>\n" +
						"                    <td style=\"padding-left:10px\">\n" +
						"                  \n" +
						"                    </td>\n" +
						"                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
						"                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Activate your account</span>\n" +
						"                    </td>\n" +
						"                  </tr>\n" +
						"                </tbody></table>\n" +
						"              </a>\n" +
						"            </td>\n" +
						"          </tr>\n" +
						"        </tbody></table>\n" +
						"        \n" +
						"      </td>\n" +
						"    </tr>\n" +
						"  </tbody></table>\n" +
						"  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
						"    <tbody><tr>\n" +
						"      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
						"      <td>\n" +
						"        \n" +
						"                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
						"                  <tbody><tr>\n" +
						"                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
						"                  </tr>\n" +
						"                </tbody></table>\n" +
						"        \n" +
						"      </td>\n" +
						"      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
						"    </tr>\n" +
						"  </tbody></table>\n" +
						"\n" +
						"\n" +
						"\n" +
						"  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
						"    <tbody><tr>\n" +
						"      <td height=\"30\"><br></td>\n" +
						"    </tr>\n" +
						"    <tr>\n" +
						"      <td width=\"10\" valign=\"middle\"><br></td>\n" +
						"      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
						"        \n" +
						"            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + user.getUsername() + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 15 minutes. <p>See you soon</p>" +
						"        \n" +
						"      </td>\n" +
						"      <td width=\"10\" valign=\"middle\"><br></td>\n" +
						"    </tr>\n" +
						"    <tr>\n" +
						"      <td height=\"30\"><br></td>\n" +
						"    </tr>\n" +
						"  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
						"\n" +
						"</div></div>";
		        
		        emailSender.send(
		             user.getEmail(),
		             buildEmail(content));
		    
		     
		       return userSave;}
			}

		@Override
		public void ActivateCompte(int userId, String expirationTime) {
		    Utilisateur user = UtilisateurRepository.findById(userId)
		            .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé avec l'ID : " + userId));
		    
		    LocalDateTime expiration = LocalDateTime.parse(expirationTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
		    LocalDateTime now = LocalDateTime.now();
		    
		    if (expiration.isAfter(now)) {
		        user.setStatut(true);
		        UtilisateurRepository.save(user);
		        System.out.println(now); // Afficher la valeur de now dans la console
		        System.out.println(expiration); // Afficher la valeur de now dans la console
		    } else {
		        throw new IllegalStateException("Le lien d'activation a expiré.");
		    }
		}





//------------------------------------------------------------	
	private String buildEmail(String content) {
		return content;
	}
//----------------------------------------
	
	public String processMessage(String message) {
	    // Vérifier si le message est vide ou nul
	    if (message == null || message.isEmpty()) {
	        // Afficher le menu avec les options disponibles
	        return "Bonjour ! Voici les options disponibles :\n" +
	               "1. Projet\n" +
	               "2. Séquence de test\n" +
	               "3. Scénario de test\n" +
	               "4. Cas de test\n" +
	               "5. Campagne de test\n" +
	               "6. Phase d'exécution";
	    }
	    
	    // Vérifier les choix du menu
	    if (message.equals("1")) {
	        return "Projet : Un projet de test est une entité dans l'application de gestion de test qui regroupe les informations relatives à un ensemble de tests pour un produit ou un système donné.";
	    } else if (message.equals("2")) {
	        return "Séquence de test : Une séquence de test est une série d'étapes ou d'actions prévues pour exécuter un ensemble de cas de test dans un ordre spécifique.";
	    } else if (message.equals("3")) {
	        return "Scénario de test : Un scénario de test est une description détaillée d'un cas de test, incluant les conditions préalables, les actions à effectuer, les données d'entrée et les résultats attendus.";
	    } else if (message.equals("4")) {
	        return "Cas de test : Un cas de test est une spécification détaillée d'une situation à tester, incluant les étapes à suivre, les données d'entrée et les résultats attendus.";
	    } else if (message.equals("5")) {
	        return "Campagne de test : Une campagne de test est une série d'activités planifiées pour tester un produit ou un système avant sa mise en production.";
	    } else if (message.equals("6")) {
	        return "Phase d'exécution : La phase d'exécution est la période pendant laquelle les tests sont effectivement exécutés individuellement, les résultats sont enregistrés selon ce principe:"
	        	
	        		+ "\r\n Succés - Lorsqu'un cas de test ou une étape correspond au résultat attendu, il est marqué comme réussi.\r\n" + 
	        		"\r\n" + 
	        		"Échec - Lorsqu'un cas de test ou une étape s'écarte du résultat attendu, il est marqué comme Échec.\r\n" + 
	        		"\r\n" + 
	        		"Bloqué - Lorsqu'un cas de test ou une étape ne peut pas être exécuté en raison d'un problème en suspens, il est marqué comme bloqué..";
	    }
	    
	    // Réponse par défaut si le choix du menu n'est pas reconnu
	    return "Je suis désolé, je ne comprends pas votre choix. Veuillez sélectionner un choix valide.";
	}
	
	
	//-----------------
	@Override
	public void deleteUtilisateur(int id) {
		UtilisateurRepository.deleteById(id);
	}
//------------------------------------------------------------	

	
	@Override
	public List<Utilisateur> retrieveAllUtilisateurs() {
			
		return (List<Utilisateur>)this.UtilisateurRepository.findAll() ;
	}
//------------------------------------------------------------	

	@Override
	public Utilisateur retrieveUtilisateur(int id) {
		return this.UtilisateurRepository.findById(id).get();
	}
//------------------------------------------------------------	

	@Override
   public Utilisateur updateUtilisateur(int id, Utilisateur user) {
		
		
	
		Utilisateur existingUtilisateur = UtilisateurRepository.findById(id).orElse(null);
       existingUtilisateur.setUsername(user.getUsername());
       existingUtilisateur.setEmail(user.getEmail());
       existingUtilisateur.setProfil(user.getProfil());
       existingUtilisateur.setStatut(user.isStatut());

       existingUtilisateur.setNom(user.getNom());
       existingUtilisateur.setPrenom(user.getPrenom());
       return UtilisateurRepository.save(existingUtilisateur);
   }
	//--------------------
	
	
	//*********
	
	@Override
	public Utilisateur updateUser(Utilisateur existingUtilisateur, MultipartFile file) throws IOException {
	    // Récupérer l'utilisateur existant depuis la base de données
	    Utilisateur utilisateur = UtilisateurRepository.findById(existingUtilisateur.getId()).orElse(null);

	    if (utilisateur != null) {
	        // Mettre à jour les attributs de l'utilisateur existant avec les nouvelles valeurs
	        utilisateur.setNom(existingUtilisateur.getNom());
	        utilisateur.setPrenom(existingUtilisateur.getPrenom());
	        utilisateur.setEmail(existingUtilisateur.getEmail());
	        utilisateur.setUsername(existingUtilisateur.getUsername());

	      
	            // Vérifier si un fichier est fourni
	            String fileName = file.getOriginalFilename();
	           
	            String uploadDir = "C://Users//T E C H O U S E//Desktop//front//src//assets//assets//uploads"; // Chemin de stockage des images (dans le répertoire de votre application)
	         
	            // Vérifier si le dossier de stockage existe, sinon le créer
	            File directory = new File(uploadDir);
	            if (!directory.exists()) {
	                directory.mkdirs();
	            }

	            // Générer un nom de fichier unique (peut être amélioré pour éviter les collisions)
	            String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

	            // Construire le chemin complet du fichier
	            String filePath = uploadDir + File.separator + uniqueFileName;

	            // Enregistrer le fichier sur le disque
	            byte[] fileBytes = file.getBytes();
	            Path path = Paths.get(filePath);
	            Files.write(path, fileBytes);

	            // Mettre à jour l'attribut d'image de l'utilisateur avec le nom du fichier
	            utilisateur.setImage(uniqueFileName);
	        
	        

	        // Enregistrer les modifications dans la base de données
	        return UtilisateurRepository.save(utilisateur);
	    } else {
	        // Gérer le cas où l'utilisateur n'existe pas
	        throw new IllegalArgumentException("Utilisateur non trouvé");
	    }
	}



//------------------------------------------------------------	
	 @Override
	    public void affecterProfilToUser(int id , int profil_id) {
	 

		    Profil profil = profilRepository.findById(profil_id)
		        .orElseThrow(() -> new IllegalArgumentException("profil non trouvé avec l'identifiant : " + profil_id));
			    Utilisateur user = UtilisateurRepository.findById(id)
			        .orElseThrow(() -> new IllegalArgumentException("user non trouvé avec l'identifiant : " + id));

	        user.setProfil(profil);
	        UtilisateurRepository.save(user);
	    }
	//------------------------------------------------------------	
	   @Override
	    public Utilisateur loadUserByUserName(String username) {
	        return UtilisateurRepository.findByUsername(username);
	    }

	   //------------------------------
	  /* private String generateTemporaryPassword() {
		    int length = 10; // Longueur du mot de passe temporaire
		    
		    // Génération d'une chaîne de caractères aléatoires
		    String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    StringBuilder sb = new StringBuilder();
		    Random random = new Random();
		    for (int i = 0; i < length; i++) {
		        int index = random.nextInt(characters.length());
		        sb.append(characters.charAt(index));
		    }
		    String plainPassword = sb.toString();
		   
		    return plainPassword;
		}

		public ResponseEntity<String> requestPasswordReset(String email) {
		    Utilisateur user = UtilisateurRepository.findByEmail(email);
		    if (user == null) {
		        return ResponseEntity.badRequest().body("Utilisateur introuvable.");
		    }
		    System.out.println(email);
		    System.out.println(user.getNom());
		    
		    // Générez un nouveau mot de passe temporaire
		    String newPassword = generateTemporaryPassword();
		    
		    // Cryptage du mot de passe temporaire
		    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		    String hashedPassword = passwordEncoder.encode(newPassword);
		    
		    // Mettez à jour le mot de passe de l'utilisateur dans la base de données
		    user.setPassword(hashedPassword);
		    UtilisateurRepository.save(user);
		    
		    emailSender.send(
		        user.getEmail(),
		        buildEmail(user.getUsername(), "", newPassword)
		    );
		  
		    return ResponseEntity.ok("Un e-mail contenant le nouveau mot de passe temporaire a été envoyé.");
		}

	    public ResponseEntity<String> resetPassword(String email, String newPassword) {
	        Utilisateur user = UtilisateurRepository.findByEmail(email);
	        if (user == null) {
	            return ResponseEntity.badRequest().body("Utilisateur introuvable.");
	        }

	        // Mettez à jour le mot de passe de l'utilisateur dans la base de données
	        user.setPassword(newPassword);
	        UtilisateurRepository.save(user);

	        return ResponseEntity.ok("Le mot de passe a été réinitialisé avec succès.");
	    }
*/
	 
	   
	   public ResponseEntity<String> requestPasswordReset(String email) {
		    Utilisateur user = UtilisateurRepository.findByEmail(email);
		    if (user == null) {
		        return ResponseEntity.badRequest().body("Utilisateur introuvable.");
		    }
		    System.out.println(email);
		    System.out.println(user.getNom());
		    
		  
		  //  String token = RandomString.make(30);
	           String resetPasswordLink =  "http://localhost:8082/reset_password?email=" + user.getEmail();
	           String content = "<p>Hello,</p>" + user.getUsername() 
	                   + "<p>You have requested to reset your password.</p>"
	                   + "<p>Click the link below to change your password:</p>"
	                   + "<p><a href=\"" + resetPasswordLink + "\">Change my password</a></p>"
	                   + "<br>"
	                   + "<p>Ignore this email if you do remember your password, "
	                   + "or you have not made the request.</p>";
		    
		    emailSender.send(
		        user.getEmail(),
		        buildEmail(content)
		    );
		  
		    return ResponseEntity.ok("Un e-mail contenant le nouveau mot de passe temporaire a été envoyé.");
		}
	   
	   
	   

	     
	    public void updatePassword(Utilisateur customer, String newPassword) {
	        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	        String encodedPassword = passwordEncoder.encode(newPassword);
	        customer.setPassword(encodedPassword);
	   
	        UtilisateurRepository.save(customer);
	    }

}
