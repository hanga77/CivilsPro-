import React from 'react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full">
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <i key={star} className={`fas fa-star text-sm ${star <= testimonial.rating ? 'text-[#FFB81C]' : 'text-slate-200'}`}></i>
        ))}
      </div>
      <p className="text-slate-600 italic text-lg leading-relaxed flex-grow mb-8">"{testimonial.content}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
        <div className="w-12 h-12 rounded-full bg-[#001E42] flex items-center justify-center text-white font-black text-lg overflow-hidden">
          {testimonial.avatarUrl ? (
            <img src={testimonial.avatarUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
          ) : (
            testimonial.clientName.charAt(0)
          )}
        </div>
        <div>
          <p className="font-black text-[#001E42] text-sm uppercase">{testimonial.clientName}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{testimonial.clientRole} — {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
