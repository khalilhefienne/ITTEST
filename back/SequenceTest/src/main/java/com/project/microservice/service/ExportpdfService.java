package com.project.microservice.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.project.microservice.entity.SequenceTest;

import org.springframework.stereotype.Service;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ExportpdfService {
    public  ByteArrayInputStream eventExport(List<SequenceTest> seqs) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try {
            PdfWriter.getInstance(document, out);
            document.open();
            com.itextpdf.text.Font font = FontFactory.getFont(FontFactory.COURIER, 14, BaseColor.BLACK);
            Paragraph para = new Paragraph("Liste des sequences", font);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);
            PdfPTable table = new PdfPTable(5);


            Stream.of("titre","date_creation", "perimetre", "type", "version","projet").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                com.itextpdf.text.Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                header.setBackgroundColor(BaseColor.BLUE);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(1);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });

            for (SequenceTest sq : seqs) {
                PdfPCell titreCell = new PdfPCell(new Phrase(sq.getTitre()));
                titreCell.setPaddingLeft(1);
                titreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                titreCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(titreCell);


               
                PdfPCell dateCell = new PdfPCell(new Phrase(String.valueOf(sq.getDate_creation())));
                dateCell.setPaddingLeft(1);
                dateCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                dateCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(dateCell);

                PdfPCell perimetreCell = new PdfPCell(new Phrase(String.valueOf(sq.getPerimetre())));
                perimetreCell.setPaddingLeft(1);
                perimetreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                perimetreCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(perimetreCell);
                
                PdfPCell typeCell = new PdfPCell(new Phrase(String.valueOf(sq.getType())));
                typeCell.setPaddingLeft(1);
                typeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                typeCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(typeCell);
               
                PdfPCell versionCell = new PdfPCell(new Phrase(String.valueOf(sq.getVersion())));
                versionCell.setPaddingLeft(1);
                versionCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                versionCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(versionCell);
                PdfPCell prCell = new PdfPCell(new Phrase(String.valueOf(sq.getProjetId())));
                prCell.setPaddingLeft(1);
                prCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                prCell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(prCell);

            }
            document.add(table);
            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        return new ByteArrayInputStream(out.toByteArray());
    }
}